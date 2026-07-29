export interface TestStatus {
  message: string;
  service: string;
  status: 'ok';
  timestamp: string;
}

export interface HomeViewModel {
  heading: string;
  message: string;
  title: string;
}

export function getTestStatus(now = new Date()): TestStatus {
  return {
    message: 'Fastify TypeScript template is running.',
    service: 'create-fastify-typescript',
    status: 'ok',
    timestamp: now.toISOString(),
  };
}

export function getHomeViewModel(): HomeViewModel {
  return {
    heading: 'Fastify TypeScript',
    message: 'HTML rendering is ready through @fastify/view and EJS.',
    title: 'Fastify TypeScript',
  };
}
