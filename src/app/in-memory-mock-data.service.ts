import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from 'app/value-objects/user';
import { Components } from 'app/value-objects/component';
import { Role } from 'app/value-objects/role';
import { Initiative } from 'app/value-objects/initiative';
import { Module } from 'app/value-objects/module';

@Injectable()
export class InMemoryMockDataService implements InMemoryDbService{

  constructor() { }
  createDb(){
    console.log('createdb called');
    const users:User[]=[
      {"id":401,"first_name":"Manish","last_name":"Bansal","email":"manishbansal8843@gmail.com","roles":[
      "Admin","Volunteer"
      ]},
      {"id":402,"first_name":"Rahul","last_name":"Sharma","email":"manishbansal1151990@gmail.com","roles":[
      "Volunteer"
      ]}
  ];
  const modules:Module[]=[
    {"id":1001,"name":"Volunteer Details","route":"/volunteer"},
    {"id":1002,"name":"Student Details","route":"/student"},
    {"id":1003,"name":"Attendance","route":"/attendance"},
    {"id":1004,"name":"Class Assignment","route":"/classAssignment"},
    {"id":1005,"name":"Calendar Update","route":"/calnedar"},
    {"id":1006,"name":"Reports","route":"/reports"},
    {"id":1007,"name":"Automated Messages","route":"/autoMessages"},
    {"id":1008,"name":"Curricullum","route":"/curricullum"},
    {"id":1009,"name":"Feedback","route":"/feedback"},
    {"id":1010,"name":"About Me","route":"/me"}


  ];
  const components:Components[]=[
    {"id":201,"name":"Volunteer DB Update","route":"/volunteer/update","parent":1001,"code":"VDBU"},
    {"id":202,"name":"Volunteer Attendendence Mark","route":"/attendence/volunteer/mark","parent":2001,"code":"VATMARK"},
    {"id":203,"name":"Volunteer Attendendence View","route":"/attendence/volunteer/view","parent":2001,"code":"VATVIEW"},
    {"id":204,"name":"Student DB Update","route":"/student/update","parent":1002,"code":"SDBU"},
    {"id":205,"name":"Student Attendendence Mark","route":"/attendence/student/mark","parent":2002,"code":"SATMARK"},
    {"id":206,"name":"Student Attendendence View","route":"/attendence/student/view","parent":2002,"code":"SATVIEW"},
    {"id":207,"name":"Student Information","route":"/student/view","parent":1002,"code":"SI"},
    {"id":1001,"name":"Volunteer Details","route":"/volunteer","parent":0},
    {"id":1002,"name":"Student Details","route":"/student","parent":0},
    {"id":1003,"name":"Attendance","route":"/attendance","parent":0},
    {"id":1004,"name":"Class Assignment","route":"/classAssignment","parent":0},
    {"id":1005,"name":"Calendar Update","route":"/calnedar","parent":0},
    {"id":1006,"name":"Reports","route":"/reports","parent":0},
    {"id":1007,"name":"Automated Messages","route":"/autoMessages","parent":0},
    {"id":1008,"name":"Curricullum","route":"/curricullum","parent":0},
    {"id":1009,"name":"Feedback","route":"/feedback","parent":0},
    {"id":1010,"name":"About Me","route":"/me","parent":0},
    {"id":2001,"name":"Volunteer Attendendence","route":"/attendence/volunteer","parent":1003},
    {"id":2002,"name":"Student Attendendence","route":"/attendence/student","parent":1003}
  ];
  const roles:Role[]=[
    
      {"id":101,"role_name":"Admin","grants":["VDBU","SDBU","VATMARK","VATVIEW","SATMARK","SATVIEW","CASS","PASS","ACU","GR","AM"]},
      {"id":102,"role_name":"Volunteer","grants":["SATMARK","SATVIEW","SI","CURR","FEED","COV"]},
      {"id":103,"role_name":"POC","grants":["VATMARK"]},
      {"id":104,"role_name":"Panelist","grants":[""]},
      {"id":105,"role_name":"TrackLead","grants":["VDBU","SDBU","CASS","ACU","VATVIEW","SATVIEW"]},
      {"id":106,"role_name":"ClassTeacher","grants":["VATVIEW"]}
  
  ];
  const initiatives:Initiative[]=[
    {"id":301,"active":true,"name":"Padhai 15.0"},
    {"id":302,"active":false,"name":"Padhai 14.0"}
];
  return {users,components,roles,initiatives};
}
}
