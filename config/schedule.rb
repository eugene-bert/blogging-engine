# env :PATH, ENV['PATH']
set :output, "log/cron_log.log"
set :runner_command, "rails runner"
# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# PATH=/Users/piotr.purwin/.rbenv/versions/2.7.2/bin:/usr/local/Cellar/rbenv/1.1.2/libexec:/Users/piotr.purwin/.rbenv/shims:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
#
#
# end
#
#

set :job_template, "bash -l -c 'PATH=#{ENV['PATH']} && :job'"
set :environment, 'development'

every 1.minute do
  runner "Article.archive_job"
end

# Learn more: http://github.com/javan/whenever
