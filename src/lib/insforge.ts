import { createClient } from '@insforge/sdk';

export const insforge = createClient({
  baseUrl: 'https://m732ftc9.eu-central.insforge.app',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODc4MDF9.f0zWDGkuE44vD0FKMkKGt5jbIXfqUX3wYNoQb5UipRQ'
});
