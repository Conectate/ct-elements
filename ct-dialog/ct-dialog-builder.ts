import { CtDialog } from './ct-dialog';
import { TemplateResult } from 'lit-html';

export default class CtDialogBuilder {
    dialog: CtDialog;
    cnx!: HTMLElement;
    dialogType!: HTMLElement;
    cornerRadiusValue = 16;

    constructor(cnx: HTMLElement = document.body, dialog = new CtDialog()) {
        this.cnx = cnx;
        this.dialog = dialog;
    }

    // ================================== Header ==================================
    icon(svg: string) {

    }

    title(title: string) {

    }


    // ================================== Button ==================================

    positiveButton(positiveButton: string) {

    }

    negativeButton(negativeButton: string) {

    }

    neutralButton(negativeButton: string) {

    }

    // ================================== BODY ==================================

    content(content: string) {

    }
    // ================= LISTAS =================
    listItems(items: string[]) {

    }

    listItemsSingleChoice(items: string[]) {

    }

    listItemsMultiChoice(items: string[]) {

    }

    customListAdapter<T = any>(items: T[], renderItem: (item: T, index: number) => TemplateResult) {

    }

    // ================= View =================
    show() {
        this.cnx.appendChild(this.dialogType);
    }

    dismiss() {

    }

    // ================= EVENTS =================
    onPreShow() {

    }

    onPostShow() {

    }

    onDismiss() {

    }

    // =============== CUSTOM ==========
    cornerRadius(radius: number) {
        this.cornerRadiusValue = radius;
    }

}
// @ts-ignore
window.CtDialogBuilder = CtDialogBuilder