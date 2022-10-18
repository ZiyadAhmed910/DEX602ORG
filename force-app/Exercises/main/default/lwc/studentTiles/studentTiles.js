import ApiName from '@salesforce/schema/OpportunityStage.ApiName';
import { LightningElement,api } from 'lwc';

export default class StudentTiles extends LightningElement {
    @api studentList = [];

    @api selectedStudentId = '';
    handleStudentSelected(event){
        this.selectedStudentId=event.detail.studentId;
        // console.log(this.selectedStudentId);
    }
}