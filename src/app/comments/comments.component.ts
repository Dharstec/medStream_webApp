import { Component, Input } from '@angular/core';
import { CommentInterface } from '../types/comment.interface';
import { ActiveCommentInterface } from '../types/activeComment.interface';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() currentCaseId!: string;

  comments: any = [];
  canViewComment:boolean=false
  i=0
  // CommentInterface[]
  activeComment: ActiveCommentInterface | null = null;

  userName = localStorage.getItem('name') || 'Unknown User'
  userId = localStorage.getItem('userEmail') || null

  constructor(
    // private commentsService: CommentsService
    private commentsService: ApiService
    ) {}

  ngOnInit(): void {
    // this.commentsService.getComments().subscribe((comments) => {
    //   this.comments = comments;
    // });
    this.commentsService.getComments(this.currentCaseId).subscribe(comments => {
      this.comments = comments;
      console.log("comment message",this.comments)
      // setTimeout(() => this.scrollToBottom(), 0); 
    });
  }

  getRootComments(): CommentInterface[] {
    // return this.comments
    return this.comments.filter((comment) => comment.parentId === "null");
  }

  updateComment(reaction:any,commentId:string): void {
    console.log("---",reaction,commentId)
    // this.commentsService
    //   .updateComment(commentId, text)
    //   .subscribe((updatedComment) => {
    //     this.comments = this.comments.map((comment) => {
    //       if (comment.id === commentId) {
    //         return updatedComment;
    //       }
    //       return comment;
    //     });

    //     this.activeComment = null;
    //   });
    this.commentsService.updateComment(this.currentCaseId,reaction.commentId,this.userId,reaction.like)
  }

  deleteComment(commentId: string) {
    // this.commentsService.deleteComment(commentId).subscribe(() => {
    //   this.comments = this.comments.filter(
    //     (comment) => comment.id !== commentId
    //   );
    // });
    // console.log("delete commenet emit",commentId)
    this.commentsService.deleteComment(this.currentCaseId,commentId)
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  addComment(text:any, parentId:any | null,type:any) {
    // this.commentsService
    //   .createComment(text, parentId)
    //   .subscribe((createdComment) => {
    //     this.comments = [...this.comments, createdComment];
    //     this.activeComment = null;
    //   });
 console.log("--------",text,parentId,type)
    var num = Math.floor((Math.random() * 1000000));
    let body = {
      id:num,
      username: this.userName,
      body: text,
      createdAt: new Date().toString(),
      userId:this.userId,
      userReact:[],
      likeCount: 0,
      dislikeCount: 0,
      parentId:parentId || "null"
    }
    if(text.parentId || text.text){
      body['body']=text.text
      body['parentId']=text.parentId
      // this.commentsService.sendReplyComments(this.currentCaseId,body,body['parentId'])
    }
    console.log("currentCaseId",this.currentCaseId)
    this.commentsService.sendComments(this.currentCaseId,body)
    this.activeComment =null
    // .subscribe((messages) => {
    //   console.log("send commentchat message",messages)
    // });
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
