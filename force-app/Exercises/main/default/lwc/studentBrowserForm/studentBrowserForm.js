import { LightningElement, wire } from 'lwc';
import getInstructors from '@salesforce/apex/StudentBrowserForm.getInstructors';
import getDeliveriesByInstructor from '@salesforce/apex/StudentBrowserForm.getDeliveriesByInstructor';

export default class StudentBrowserForm extends LightningElement {
    selectedInstructorId = '';
    selectedDeliveryId = '';
    error = '';
    deliveries=[];
    instructors=[];
    @wire(getInstructors) wired_getInstructors({error,data}){
        this.instructors=[];
        if(data){
            this.instructors.push({
                value:'', label:'Select Instructor'
            });
            data.forEach(instructor => {
                this.instructors.push({value:instructor.Id, label:instructor.Name});
            });
        }
        else if(error){
            this.error=error;
        }
    }

    @wire(getDeliveriesByInstructor, {instructorId:'$selectedInstructorId'})
        wired_getDeliveriesByInstructor({ error, data }) {
            this.deliveries = [];
            if (data && data.length) {
                
                this.deliveries = data.map(delivery => ({
                    value: delivery.Id,
                    label: `${delivery.Start_Date__c} ${delivery.Location__c} ${delivery.Attendee_Count__c} students`
                }));
        
                this.deliveries.unshift({
                    value: '',
                    label: 'Any Delivery' 
                });
        
            } else if (error) {
                this.error = error;
            }
        }
    handleChange(event){
        this.selectedDeliveryId = '';
        this.selectedInstructorId=event.target.value;
        this.notifyParent();
    } 

    onDeliveryChange(event){
        this.selectedDeliveryId = '';
        this.selectedDeliveryId = event.target.value;
        this.notifyParent();
    }

    notifyParent(){
        const evt = new CustomEvent('filterchange',{
            detail:{
                instructorId : this.selectedInstructorId,
                deliveryId : this.selectedDeliveryId
            }});
        this.dispatchEvent(evt);

    }
}