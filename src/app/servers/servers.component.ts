import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "No server was created";
  serverName = 'Nooooone';
  serverCreated = false;
  servers = ['TestServer', 'TestServer 2'];

  constructor() {
    setTimeout(()=> { this.allowNewServer = true } ,2000)
   }

  ngOnInit() {
  }

  onCreateServer(){
    this.servers.push(this.serverName);
    this.serverCreationStatus = "server with name " + this.serverName + " was created!";
    this.serverCreated = true;
  }

  onUpdateServerName(event){
    this.serverName = event.target.value;
  }
}
