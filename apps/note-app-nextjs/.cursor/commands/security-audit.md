# Security Audit

Perform the following security audit steps and report which steps passed, failed and which ones you were not able to verify.

1. **CORS policy:** Verify CORS policy for dev and prod environments to allow only necessary domains to connect to the API.
2. **CSP headers:** Verify CSP headers to not allow external domains to load scripts in the document.
3. **XSS protection:** Verify if inputs are safe from XSS attacks. Add executable `<script>alert('malicious script')</script>` inside the inputs and make sure they are not interpreted as JavaScript commands.
4. **Malformed data handling:** Check if the back-end handles malformed data in API requests and the front-end shows a corresponding user-friendly message. For example, try SQL injection attempts from inputs to verify this.
5. **Dependency check:** Watch for npm dependencies with vulnerabilities and report the list.
6. **Environment variables:** Ensure no sensitive back-end secrets or API keys are exposed in the client-side bundle.
7. **Secure storage:** Verify that sensitive user data and authentication tokens are not stored in plain text in `localStorage` or `sessionStorage`.
8. **Sensitive data logging:** Verify that sensitive information such as PII data and authentication tokens are not stored in error logs or sent to monitoring platforms.
9. **CSRF protection:** Ensure that state-changing API requests require a valid CSRF token to prevent Cross-Site Request Forgery attacks.
