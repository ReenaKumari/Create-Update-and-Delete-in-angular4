"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var ArticleService = /** @class */ (function () {
    function ArticleService(http) {
        this.http = http;
        //URL for CRUD operations
        this.articleUrl = "http://localhost:3000/articles";
    }
    //Fetch all articles
    ArticleService.prototype.getAllArticles = function () {
        return this.http.get(this.articleUrl).map(function (response) { return response.json(); });
    };
    ArticleService.prototype.createArticle = function (article) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.post(this.articleUrl, article, options)
            .map(function (success) { return success.status; });
    };
    ArticleService.prototype.getArticleById = function (articleId) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        console.log(this.articleUrl + "/" + articleId);
        return this.http.get(this.articleUrl + "/" + articleId)
            .map(this.extractData);
    };
    //Update article
    ArticleService.prototype.updateArticle = function (article) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.put(this.articleUrl + "/" + article.id, article, options)
            .map(function (success) { return success.status; });
    };
    //Delete article    
    ArticleService.prototype.deleteArticleById = function (articleId) {
        var cpHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.articleUrl + "/" + articleId)
            .map(function (success) { return success.status; });
    };
    ArticleService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ArticleService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    ArticleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ArticleService);
    return ArticleService;
}());
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map