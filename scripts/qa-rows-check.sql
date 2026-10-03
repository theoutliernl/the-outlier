-- S1: QA-testrijen inventariseren + opruimen (akkoord Seyed via chat)
select 'contact_submissions' as tabel, count(*) from public.contact_submissions
union all select 'assessment_submissions', count(*) from public.assessment_submissions
union all select 'newsletter_optins', count(*) from public.newsletter_optins;