import { localURL } from "../../../src/utils/constants";

describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit(`${localURL}`);
    cy.wait(1000);
  });
  it('should be available on localhost:3000/login', function() {
    cy.visit(`${localURL}/login`);
    cy.wait(1000);
  });
  it('should be available on localhost:3000/register', function() {
    cy.visit(`${localURL}/register`);
    cy.wait(1000);
  });
  it('should be available on localhost:3000/forgot-password', function() {
    cy.visit(`${localURL}/forgot-password`);
    cy.wait(1000);
  });
  it('should be available on localhost:3000/reset-password', function() {
    cy.visit(`${localURL}/reset-password`);
    cy.wait(1000);
  });      
  it('should be available on localhost:3000/profile', function() {
    cy.visit(`${localURL}/profile`);
    cy.wait(1000);
  }); 
  it('should be available on localhost:3000/feed', function() {
    cy.visit(`${localURL}/feed`);
    cy.wait(1000);
  });        
}); 