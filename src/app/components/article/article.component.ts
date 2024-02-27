import { Component, OnInit } from '@angular/core';
import { ServiceTypeService } from '../../services/serviceArticle.service';
import { articleInterface } from '../../entities/articleInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articleList: serviceInterface[] = [];

  constructor(private articleService: ServiceTypeService) {}

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
