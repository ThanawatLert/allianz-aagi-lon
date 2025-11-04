module.exports = {
  apps: [
    {
      script: 'dist/main.js',
      name: 'primary',
      exec_mode: 'cluster',
      instances: 1,
    },
  ],
};

// {
//   script: "app.js",
//   name: "schedule",
//   exec_mode: "cluster",
//   instances: 1
// }
// https://anjarulrobin.medium.com/pm2-run-cron-job-from-single-process-in-cluster-mode-35f44ace9e4d
