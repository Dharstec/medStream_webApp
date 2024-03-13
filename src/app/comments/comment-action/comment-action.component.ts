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
  updateComment = new EventEmitter<{ like: string; commentId: any }>();

  createdAt: string = '';
  canReply: boolean = false;
  // canEdit: boolean = false;
  canDelete: boolean = false;
  canViewReply:boolean=false
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;

  likeStyles=null

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

  commentLike(type?:any){
    if(type=='like'){
      if(this.likeStyles==null
        ){
        this.comment['likeCount'] +=  1
      }
      else{
        if(this.likeStyles)  this.comment['likeCount'] = this.comment['likeCount'] 
        else{
          this.comment['likeCount'] +=  1
          this.comment['dislikeCount'] = this.comment['dislikeCount']==0 ? 0 : this.comment['dislikeCount'] - 1
        }
        
      }
      this.likeStyles=true;
    }else{
      if(this.likeStyles==null){
        this.comment['dislikeCount'] +=  1
      }
      else{
        if(!this.likeStyles)  this.comment['dislikeCount'] = this.comment['dislikeCount'] 
        else{
          this.comment['dislikeCount'] +=  1
          this.comment['likeCount'] = this.comment['likeCount']==0 ? 0 : this.comment['likeCount'] - 1
        }
        
      }
      this.likeStyles=false;
    }
    if( this.comment['likeCount']==0 &&  this.comment['dislikeCount'] ==0){
      this.likeStyles =null
    }

  }
  updateLike(react,type){
    this.commentLike(type);
    this.updateComment.emit({ like: react, commentId: this.comment })
   
  }


  getLikeColor(){
    this.likeStyles=null
    // if (!this.activeComment) {
    //   return 'like_thumb';
    // }
    // console.log("activeComment",this.activeComment)
    console.log("comment child",this.comment)
    // console.log("activeCommentType",this.activeCommentType)
    if(this.comment.hasOwnProperty("userReact")){
      // console.log("usereact in",this.comment)
      this.comment.userReact.map((key:any)=>{ 
        if(key.userId==this.userId
               ){
                if(key.like && key.like==true){
                  this.likeStyles=true
                }else{
                  this.likeStyles=false
                }
        }

      })
      }else{
        this.comment['likeCount']=0
        this.comment['dislikeCount']=0
        this.likeStyles=null
      }
  }
}
