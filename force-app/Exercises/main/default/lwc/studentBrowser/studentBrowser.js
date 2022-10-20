import { LightningElement, wire} from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';

export default class StudentBrowser extends LightningElement {
    students = [];
    // studentList=[];
    @wire (getStudents, {instructorId:'$selectedInstructorId',courseDeliveryId:'$selectedDeliveryId'}) wired_getStudents(result) {
        if ((result.data) || (result.error)) {
        this.students = result;
        this.dispatchEvent(new CustomEvent("doneloading",
        {bubbles: true, composed: true }));
        }
        };
    selectedDeliveryId='';
    selectedInstructorId='';
    
    handleFilterChange(event){
        this.selectedInstructorId=event.detail.instructorId;
        this.selectedDeliveryId=event.detail.deliveryId;
        this.dispatchEvent(new CustomEvent('loading',
        {bubbles:true, composed:true }));
    }

    @wire(MessageContext) messageContext;
    handleStudentSelected(event){
        const studentId = event.detail.studentId;
        this.updateSelectedStudent(studentId);
    }
    
    updateSelectedStudent(studentId){
        publish(this.messageContext, SELECTED_STUDENT_CHANNEL, {
        studentId: studentId
        });
    }
}