select table_name from information_schema.tables where table_schema='public' and table_name in ('contact_submissions','assessment_submissions','newsletter_optins') order by 1;
