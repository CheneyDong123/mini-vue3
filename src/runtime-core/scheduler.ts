const queue: any[] = [];
const p = Promise.resolve();

let isFlushPending = false;

export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job);
  }

  queueFlush();
}

function queueFlush() {
  if (isFlushPending) return;
  isFlushPending = true;

  nextTick(flushJobs);
}

function flushJobs() {
  let job;
  isFlushPending = false;
  while ((job = queue.shift())) {
    job && job();
  }
}
