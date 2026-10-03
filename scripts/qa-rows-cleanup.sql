-- S1: alleen QA-testrijen verwijderen (email op *.test / @qa / @example), echte leads behouden
delete from public.contact_submissions
  where email like '%.test' or email like '%@qa.%' or email like '%@example.%' or email like 'qa@%'
  or name in ('QA', 'Check', 'test', 'Test');
delete from public.assessment_submissions
  where email like '%.test' or email like '%@qa.%' or email like '%@example.%' or email like 'qa@%'
  or name in ('QA', 'Check', 'test', 'Test');
delete from public.newsletter_optins
  where email like '%.test' or email like '%@qa.%' or email like '%@example.%' or email like 'qa@%';