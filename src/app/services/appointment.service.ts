import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../model/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public fetchAll():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiServerUrl+"/appointements/findAll");
  }
  public addAppointment(appointment :Appointment){
      return this.http.post<Appointment>(this.apiServerUrl+"/appointements/add",appointment);
  }

  public delete(id:number){
    return this.http.delete<Appointment>(this.apiServerUrl+'/appointements/delete/'+id);

  }
  public findById(id: number) {
    return this.http.get<Appointment>(this.apiServerUrl + '/appointements/findbyid/' + id);
  }

  consulterApoointment(id: number): Observable<Appointment> {
    const url = `${this.apiServerUrl + 'findbyid/'}/${id}`;
    return this.http.get<Appointment>(url);
    }


    public update(id: number, appointment: Appointment) {
      return this.http.put<Appointment>(this.apiServerUrl +'/appointements/update/' + id,appointment);
    }
  }
