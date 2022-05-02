import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

export class SnackBarMessage {
    message: string = '';
    action?: string = '';
    horizontalPosition?: string;
    verticalPosition?: string;
    panelClass?: string; // should be 'error' , 'warning', ''success
}

@Injectable({
    providedIn: 'root'
})
export class CustomSnackBarService implements OnDestroy {
    private snackBarRef: any;
    private msgQueue: Array<SnackBarMessage> = [];
    private isInstanceVisible = false;
    private subscription: Subscription = new Subscription();

    constructor(public snackBar: MatSnackBar) {
    }

    showNextSnackBar() {
        if (this.msgQueue.length === 0) {
            return;
        }
        const message: any = this.msgQueue.shift();
        this.isInstanceVisible = true;
        this.snackBarRef = this.snackBar.open(message.message, message.action, {
            duration: 3000,
            horizontalPosition: <MatSnackBarHorizontalPosition>message.horizontalPosition,
            verticalPosition: <MatSnackBarVerticalPosition>message.verticalPosition,
            panelClass: message.panelClass
        });
        this.snackBarRef.afterDismissed().subscribe(() => {
            this.isInstanceVisible = false;
            this.showNextSnackBar();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * Add a message
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param config Additional configuration options for the snackbar.
     */
    add(snackBarMessage: SnackBarMessage): void {

        const sbMessage = new SnackBarMessage();
        sbMessage.message = snackBarMessage.message;
        sbMessage.action = snackBarMessage.action;
        sbMessage.verticalPosition = snackBarMessage.verticalPosition || 'bottom';
        sbMessage.horizontalPosition = snackBarMessage.horizontalPosition || 'center';
        sbMessage.panelClass = snackBarMessage.panelClass || 'Error';

        this.msgQueue.push(sbMessage);
        if (!this.isInstanceVisible) {
            this.showNextSnackBar();
        }
    }
}
