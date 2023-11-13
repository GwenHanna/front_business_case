import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommentInterface } from '../../entities/commentInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  comments: CommentInterface[] = [];
  curentPage = 1;
  dataIsEmpty = false;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComment(this.curentPage);
  }

  loadComment(page: number) {
    this.commentService.getCommentsPage(page).subscribe({
      next: (data: any) => {
        console.log('curentPage : ' + this.curentPage);
        if (data.length === 0 && this.curentPage !== 1) {
          this.curentPage = 1;
          this.loadComment(this.curentPage);
        } else {
          this.comments = data;
          this.dataIsEmpty = false;
        }
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
  nextPage() {
    this.curentPage++;
    this.loadComment(this.curentPage);
  }
  previousPage() {
    if (this.curentPage > 1) {
      this.curentPage--;
      this.loadComment(this.curentPage);
    }
  }
  displayComment() {
    this.commentService.isEmpty$.subscribe({
      next: (data) => {
        this.dataIsEmpty = data;
        if (data === false) {
          this.loadComment(this.curentPage);
        } else {
          this.curentPage = 1;
        }
      },
    });
  }

  getScoreArray(scores: number): any[] {
    return new Array(scores);
  }
  getScoreEmptyArray(scores: number): any[] {
    return new Array(5 - scores);
  }
}
