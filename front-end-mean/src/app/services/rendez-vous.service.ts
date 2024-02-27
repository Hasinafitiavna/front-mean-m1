import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  url = 'http://localhost:3000';
  private apiUrl = environment.host + '/rendezVous';

  constructor(private auth: AuthService) { }

  async supprimerServiceAuPanier(idService: any) {
    try {
      const panier = {
        clientId: this.auth.getId(),
        serviceId: idService
      }
      return await axios.post(`${this.apiUrl}/supprimerServiceAuPanier`, panier);
    } catch (erreur) {
      throw erreur;
    }
  }

  async ajouterAuPanier(nouveauService: any) {
    try {
      nouveauService.client_id = this.auth.getId();
      return await axios.post(`${this.apiUrl}/ajouterPanier`, nouveauService);
    } catch (erreur) {
      throw erreur;
    }
  }

  async ajouterRdv(nouveauRdv: any) {
    try {
      nouveauRdv.client_id = this.auth.getId();
      return await axios.post(`${this.apiUrl}`, nouveauRdv);
    } catch (erreur) {
      throw erreur;
    }
  }

  getRendezVous(id: string,pageNumber: number,pageSize:number){
    return axios.get(`${this.url}/api/rendezVous/getRendezVous/${id}/${pageNumber}/${pageSize}`)
  }

  compteNbServiceAuPanier(){
    return axios.get(`${this.apiUrl}/nbServiceAuPanier/${this.auth.getId()}`)
  }

  async obtenirDernierPanierParIdClient(): Promise<any[]>  {
    try {
      const response = await axios.get(`${this.apiUrl}/obtenirDernierPanierParIdClient/${this.auth.getId()}`);
      return response.data.data.services;
    } catch (error) {
      throw error;
    }
  }



}
