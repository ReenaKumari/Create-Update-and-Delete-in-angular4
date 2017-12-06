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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var article_service_1 = require("./article.service");
var ArticleComponent = /** @class */ (function () {
    function ArticleComponent(route, router, articleService, formBuilder) {
        this.route = route;
        this.router = router;
        this.articleService = articleService;
        this.formBuilder = formBuilder;
        this.requestProcessing = "false";
        this.articleIdToUpdate = null;
        this.processValidation = "false";
        this.articleForm = this.formBuilder.group({
            title: new forms_1.FormControl('', forms_1.Validators.required),
            category: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    ArticleComponent.prototype.ngOnInit = function () {
        this.getAllArticles();
    };
    ArticleComponent.prototype.getAllArticles = function () {
        var _this = this;
        this.articleService.getAllArticles()
            .subscribe(function (data) { return _this.allArticles = data; }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    ArticleComponent.prototype.onArticleFormSubmit = function () {
        var _this = this;
        this.processValidation = "true";
        if (this.articleForm.invalid) {
            return;
        }
        this.preProcessConfigurations();
        var article = this.articleForm.value;
        if (this.articleIdToUpdate === null) {
            this.articleService.getAllArticles()
                .subscribe(function (articles) {
                var maxIndex = articles.length - 1;
                var articleWithMaxIndex = articles[maxIndex];
                var articleId = articleWithMaxIndex.id + 1;
                article.id = articleId;
                _this.articleService.createArticle(article)
                    .subscribe(function (successCode) {
                    _this.statusCode = successCode;
                    _this.getAllArticles();
                    _this.backToCreateArticle();
                }, function (errorCode) { return _this.statusCode = errorCode; });
            });
        }
        else {
            article.id = this.articleIdToUpdate;
            this.articleService.updateArticle(article)
                .subscribe(function (successCode) {
                _this.statusCode = successCode;
                _this.getAllArticles();
                _this.backToCreateArticle();
            }, function (errorCode) { return _this.statusCode = errorCode; });
        }
    };
    ArticleComponent.prototype.loadArticleToEdit = function (articleId) {
        var _this = this;
        this.preProcessConfigurations();
        this.articleService.getArticleById(articleId)
            .subscribe(function (article) {
            _this.articleIdToUpdate = article.id;
            _this.articleForm.setValue({ title: article.title, category: article.category });
            _this.processValidation = "true";
            _this.requestProcessing = "false";
        }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    //Delete article
    ArticleComponent.prototype.deleteArticle = function (articleId) {
        var _this = this;
        this.preProcessConfigurations();
        this.articleService.deleteArticleById(articleId)
            .subscribe(function (successCode) {
            //this.statusCode = successCode;
            //Expecting success code 204 from server
            _this.statusCode = 204;
            _this.getAllArticles();
            _this.backToCreateArticle();
        }, function (errorCode) { return _this.statusCode = errorCode; });
    };
    ArticleComponent.prototype.preProcessConfigurations = function () {
        this.statusCode = null;
        this.requestProcessing = "true";
    };
    ArticleComponent.prototype.backToCreateArticle = function () {
        this.articleIdToUpdate = null;
        this.articleForm.reset();
        this.processValidation = "false";
    };
    ArticleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'article.component.html',
            styleUrls: ['article.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            article_service_1.ArticleService,
            forms_1.FormBuilder])
    ], ArticleComponent);
    return ArticleComponent;
}());
exports.ArticleComponent = ArticleComponent;
//# sourceMappingURL=article.component.js.map