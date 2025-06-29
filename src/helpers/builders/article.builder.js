import { faker } from "@faker-js/faker";
export class ArticleBuilder {
  addArticleTitle() {
    this.articleTitle = faker.lorem.sentence({ min: 2, max: 6 });
    return this;
  }
  addAbout() {
    this.about = faker.lorem.sentence({ min: 3, max: 7 });
    return this;
  }
  addArticle() {
    this.article = faker.lorem.paragraphs({ min: 2, max: 5 });
    return this;
  }
  addTag() {
    this.tag = faker.word.noun({
      length: { min: 4, max: 10 },
      strategy: "any-length",
    });
    return this;
  }
  generate() {
    return {
      articleTitle: this.articleTitle,
      about: this.about,
      article: this.article,
      tag: this.tag,
    };
  }
}
