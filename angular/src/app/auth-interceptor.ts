import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

// ...
// Example of user credentials to match against incoming credentials.
const username  = 'mail@mail.com';
const password  = 'password1';

// list of friends to return when the route /api/friends is invoked.
const friends   = ['alice', 'bob']

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlsQG1haWwuY29tIiwibmFtZSI6IkpvaG5ueSBEb2V5In0.j86z6Ax2vB3kbuyPOmAZv538GqMTfT9LEksVe7Jf0to';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { 
        body,       // object
        headers,    // object
        method,     // string
        url,        // string
    } = req;

      if(url === '/api/auth' && (username === body.credentials.credentials.username && password === body.credentials.credentials.password)) {
        return makeResponse(token)
      } else if (url === '/api/friends' && (headers.get('Authorization') === `Bearer ${token}`)) {
        return makeResponse(friends)
      } else if (url === '/api/friends' && (headers.get('Authorization') !== `Bearer ${token}`)) {
        return makeError(401, 'token not found')
      } else if (url === '/api/auth' && (username !== body.credentials.credentials.username || password !== body.credentials.credentials.password)) {
          return makeError(401, 'invalid user credentials')
      } else {
        return makeError(400, 'error')
      }
  }
}
