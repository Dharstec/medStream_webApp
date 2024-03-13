import { Component, Input } from '@angular/core';
import { CommentInterface } from '../types/comment.interface';
import { ActiveCommentInterface } from '../types/activeComment.interface';
import { ApiService } from '../services/api.service';
import * as _ from "lodash";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() currentCaseId!: string;

  comments: any = [];
  canViewComment: boolean = false
  // CommentInterface[]
  activeComment: ActiveCommentInterface | null = null;

  userName = localStorage.getItem('name') || 'Anonymous'
  userId = localStorage.getItem('userEmail') || null

  constructor(
    // private commentsService: CommentsService
    private commentsService: ApiService
  ) { }

  ngOnInit(): void {
    this.comments=[]
    console.log("currentCaseId message", this.currentCaseId)
    this.commentsService.getComments(this.currentCaseId).then(comments => {
      let response = comments.val();
      console.log("comment message", response)
      Object.keys(response).forEach((key) => {
        let reactList = []
        if(response[key].hasOwnProperty('userReact')){
          Object.keys(response[key]['userReact']).forEach((childKey, childIndex) => {
            reactList.push({ key: childKey, ...response[key]['userReact'][childKey] })
          })
          reactList=_.uniqBy(reactList,'userId') 
          response[key]['userReact'] = reactList
        }
        response[key]['likeCount'] = reactList.length ? reactList.filter((e: any) => e.like).length : 0
        response[key]['dislikeCount'] = reactList.length ? reactList.filter((e: any) => !e.like).length : 0
        this.comments.push({ key: key, ...response[key] })
        console.log("count", response[key]['likeCount'] , response[key]['dislikeCount'] )
        // setTimeout(() => this.scrollToBottom(), 0); 
      });
    })
  }

  getRootComments(): CommentInterface[] {
    // return this.comments
    return this.comments.filter((comment) => comment.parentId === "null");
  }

  updateComment(reaction: any, commentId: string) {
    this.comments.map(cmt => {
      // console.log("cmt",cmt,reaction,this.userId)
      if (cmt.id == reaction.commentId.id && cmt.hasOwnProperty('userReact')) {
        // console.log("cmt innn",reaction)
        cmt['userReact'].map(e => e.userId == this.userId ? e.like = reaction.like : null)
        // cmt['userReact'].like = reaction.like
      }
      if(cmt.id == reaction.commentId.id && !cmt.hasOwnProperty('userReact')){
        cmt['userReact']=[]
        cmt['userReact'].push({like:reaction.like,userId:this.userId})
      }
    })
    this.commentsService.updateComment(this.currentCaseId, reaction.commentId, this.userId, reaction.like)

  }

  deleteComment(commentId: string) {
    this.comments = this.comments.filter(e => e.id !== commentId)
    this.commentsService.deleteComment(this.currentCaseId, commentId)
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  addComment(text: any, parentId: any | null, type: any) {

    // console.log("--------", text, parentId, type)
    var num = Math.floor((Math.random() * 1000000));
    let body = {
      id: num,
      username: this.userName,
      body: text,
      createdAt: new Date().toString(),
      userId: this.userId,
      userReact: [],
      likeCount: 0,
      dislikeCount: 0,
      parentId: parentId || "null"
    }
    if (text.parentId || text.text) {
      body['body'] = text.text
      body['parentId'] = text.parentId
    }
    this.commentsService.sendComments(this.currentCaseId, body)
    this.ngOnInit()
    this.activeComment = null
  }

  getReplies(commentId: string): CommentInterface[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

}
