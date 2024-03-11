import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { ActiveCommentInterface } from 'src/app/types/activeComment.interface';
import { ActiveCommentTypeEnum } from 'src/app/types/activeCommentType.enum';
import { CommentInterface } from 'src/app/types/comment.interface';

@Component({
  selector: 'app-comment-action',
  templateUrl: './comment-action.component.html',
  styleUrls: ['./comment-action.component.scss']
})
export class CommentActionComponent {

  @Input() comment!: CommentInterface;
  @Input() activeComment!: ActiveCommentInterface | null;
  @Input() replies!: CommentInterface[];
  @Input() currentCaseId!: string;
  @Input() parentId!: string | null;

  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output()
  deleteComment = new EventEmitter<string>();
  @Output()
  addComment = new EventEmitter<{ text: string; parentId: string | null }>();
  @Output()
  updateComment = new EventEmitter<{ text: string; commentId: string }>();

  createdAt: string = '';
  canReply: boolean = false;
  // canEdit: boolean = false;
  canDelete: boolean = false;
  canViewReply:boolean=false
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;

  likeStyle:boolean=false
  dislikeStyle:boolean=false

  likeCount:any=0
  dislikeCount:any=0

  userId = localStorage.getItem('userEmail') || null
  

  ngOnInit(): void {
    const fiveMinutes = 300000;
    const timePassed =
      new Date().getMilliseconds() -
        new Date(this.comment.createdAt).getMilliseconds() >
      fiveMinutes;
    // this.createdAt = new Date(this.comment.createdAt).toLocaleDateString();
    this.createdAt =  moment(this.comment.createdAt).format('DD MMM YY LT');
    this.canReply = Boolean(this.comment.parentId=='null');
    // this.canEdit = this.currentCaseId === this.comment.userId && !timePassed;
    this.canDelete =
      this.userId === this.comment.userId &&
      // this.replies.length === 0 &&
      !timePassed;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
    this.getLikeColor()
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    // console.log("activeComment",this.activeComment)
    // console.log("comment",this.comment)
    // console.log("activeCommentType",this.activeCommentType)
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === 'editing'
    );
  }

  commentLike(){

  }

  getLikeColor(){
    let styleClass=''
    // if (!this.activeComment) {
    //   return 'like_thumb';
    // }
    // console.log("activeComment",this.activeComment)
    console.log("comment",this.comment)
    // console.log("activeCommentType",this.activeCommentType)
    if(this.comment.hasOwnProperty("userReact")){
      console.log("usereact in")
        Object.keys(this.comment.userReact).forEach(key=>{ 
          if(this.comment.userReact[key].userId==this.userId 
                 ){
                  if(this.comment.userReact[key].like){
                    this.likeStyle=true
                    this.dislikeStyle=false
                  }else{
                    this.dislikeStyle=true
                    this.likeStyle=false
                  }
            // styleClass = ''
          }

          if(this.comment.userReact[key].like){
              this.comment['likeCount']=this.likeCount + 1
          }else{
            this.comment['dislikeCount']=this.dislikeCount + 1
          }
        })
      }else{
        this.likeStyle=false
        this.dislikeStyle=false
        styleClass = 'like_thumb'
      }
      // if(this.comment.hasOwnProperty("userReact")){
      //   console.log("dislike inn",)
      //   Object.keys(this.comment.userReact).forEach(key=>{ 
      //     if(this.comment.userReact[key].userId==this.userId && !this.comment.userReact[key].like &&
      //      this.activeComment.id === this.comment.id &&
      //       this.activeComment.type === this.activeCommentType.dislike
      //            ){
      //             console.log("dislike class changes",)
      //       styleClass = ''
      //     }
      //   })
      // }else{
      //   console.log("dislike white class",)
      //   styleClass = 'like_thumb'
      // }
      // return styleClass
  }
}
