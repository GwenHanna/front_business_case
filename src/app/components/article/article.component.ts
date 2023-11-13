import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { articleInterface } from '../../entities/articleInterface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articleList: articleInterface[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.displayArticle();
  }

  displayArticle() {
    this.articleService.fetchAllArticle().subscribe((data) => {
      this.articleList = data;
    });

    return this.articleList;
  }
}
