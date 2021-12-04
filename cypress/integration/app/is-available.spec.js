import { localURL } from "../../../src/utils/constants";

describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit(`${localURL}`);
  });
  it('should be available on localhost:3000/login', function() {
    cy.visit(`${localURL}/login`);
  });
  it('should be available on localhost:3000/register', function() {
    cy.visit(`${localURL}/register`);
  });
  it('should be available on localhost:3000/forgot-password', function() {
    cy.visit(`${localURL}/forgot-password`);
  });
  it('should be available on localhost:3000/reset-password', function() {
    cy.visit(`${localURL}/reset-password`);
  });      
  it('should be available on localhost:3000/profile', function() {
    cy.visit(`${localURL}/profile`);
  }); 
  it('should be available on localhost:3000/feed', function() {
    cy.visit(`${localURL}/feed`);
  });        
}); 