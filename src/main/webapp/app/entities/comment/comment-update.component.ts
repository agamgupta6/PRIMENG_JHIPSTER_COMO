import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { IUser, UserService } from 'app/core';
import { IComo } from 'app/shared/model/como.model';
import { ComoService } from 'app/entities/como';
import { IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from 'app/entities/answer';

@Component({
    selector: 'jhi-comment-update',
    templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
    comment: IComment;
    isSaving: boolean;

    users: IUser[];

    comos: IComo[];

    answers: IAnswer[];
    createdAt: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commentService: CommentService,
        protected userService: UserService,
        protected comoService: ComoService,
        protected answerService: AnswerService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
            this.createdAt = this.comment.createdAt != null ? this.comment.createdAt.format(DATE_TIME_FORMAT) : null;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.comoService.query().subscribe(
            (res: HttpResponse<IComo[]>) => {
                this.comos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.answerService.query().subscribe(
            (res: HttpResponse<IAnswer[]>) => {
                this.answers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.comment.createdAt = this.createdAt != null ? moment(this.createdAt, DATE_TIME_FORMAT) : null;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(this.commentService.create(this.comment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
        result.subscribe((res: HttpResponse<IComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackComoById(index: number, item: IComo) {
        return item.id;
    }

    trackAnswerById(index: number, item: IAnswer) {
        return item.id;
    }
}
