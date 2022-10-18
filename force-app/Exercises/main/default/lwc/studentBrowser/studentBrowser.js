import { LightningElement, wire} from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';

export default class StudentBrowser extends LightningElement {
    // studentList=[];
    @wire (getStudents, {instructorId:'$selectedInstructorId',courseDeliveryId:'$selectedDeliveryId'}) students;
    
    selectedDeliveryId='';
    selectedInstructorId='';
    handleFilterChange(event){
        this.selectedInstructorId=event.detail.instructorId;
        this.selectedDeliveryId=event.detail.deliveryId;
    }
}