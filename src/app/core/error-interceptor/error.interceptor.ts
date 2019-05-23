import { ErrorHandler, Inject, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { SoftBankError, SoftBankErrorType } from "../domain/soft-bank-error";
import { Store } from "@ngrx/store";
import { Logger } from "../../util/logger";
import * as ObjectUtil from "../../util/object.util";

@Injectable()
export class ErrorInterceptor extends ErrorHandler {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ErrorInterceptor");

    /**
     * Reference to the Angular injector so we can use in the create error method.
     */
    private static injector: Injector;

    /**
     * Flag indicating if an error is already showing.
     */
    private isShowingError = false;

    /**
     * Constructor.
     * @param injector
     */
    constructor(@Inject(Injector) injector: Injector) {
        super();
        ErrorInterceptor.logger.debug(`Constructor()`);
        ErrorInterceptor.injector = injector;

        // NOTE: DO NOT attempt to inject or use the Injector here or you'll run into an infinite loop!!!
    }

    /**
     * Converts a string to an Error object.
     * @param error
     */
    private static coerceToError(error: any): Error {
        let result = error;
        if (ObjectUtil.isString(error)) {
            result = new Error(error);
        }
        return result;
    }

    /**
     * Creates a client runtime error and dispatches an error action.
     */
    public static createError(error: any, name: string = "", message: string = ""): void {
        error = ErrorInterceptor.coerceToError(error);
        const errorName: string = name || error.name || "Unknown";
        ErrorInterceptor.logError(error);
        const err: SoftBankError = {
            title: "Application Error",
            message,
            code: `CRE-${errorName}`,
            visible: true,
            type: SoftBankErrorType.RUNTIME
        };
        const store$: Store<any> = this.injector.get(Store);

        // TODO: BMR: 05/02/2019
        // if (!this.isShowingError) {
        //     const msg = `Title: ${err.title}\n` +
        //         `Message: ${err.message}\n`;
        //     alert(msg);
        // }
        // store$.dispatch(new LayoutActions.ShowError(err));
    }

    /**
     * Allows other modules in the app to log the error in odd cases where we can't use the global
     * error handler.
     * @param error
     */
    public static logError(error): void {
        const name = error.name || "unknown";
        ErrorInterceptor.logger.error(`createError( Client Runtime Error: ${name} ) \n ${error.stack}`);
    }

    /**
     * Handles any and all uncaught runtime errors.
     * @param error
     */
    public handleError(error: any) {
        if (!(error instanceof HttpErrorResponse)) {
            ErrorInterceptor.createError(error);
        }
    }
}
