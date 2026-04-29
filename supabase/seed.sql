insert into public.teams (id, name, code, flag_emoji, group_stage) values
('qat','Qatar','QAT','🇶🇦','A'),('ecu','Ecuador','ECU','🇪🇨','A'),('sen','Senegal','SEN','🇸🇳','A'),('ned','Netherlands','NED','🇳🇱','A'),
('eng','England','ENG','🇬🇧','B'),('irn','Iran','IRN','🇮🇷','B'),('usa','United States','USA','🇺🇸','B'),('wal','Wales','WAL','🏴','B'),
('arg','Argentina','ARG','🇦🇷','C'),('ksa','Saudi Arabia','KSA','🇸🇦','C'),('mex','Mexico','MEX','🇲🇽','C'),('pol','Poland','POL','🇵🇱','C'),
('fra','France','FRA','🇫🇷','D'),('aus','Australia','AUS','🇦🇺','D'),('den','Denmark','DEN','🇩🇰','D'),('tun','Tunisia','TUN','🇹🇳','D'),
('esp','Spain','ESP','🇪🇸','E'),('crc','Costa Rica','CRC','🇨🇷','E'),('ger','Germany','GER','🇩🇪','E'),('jpn','Japan','JPN','🇯🇵','E'),
('bel','Belgium','BEL','🇧🇪','F'),('can','Canada','CAN','🇨🇦','F'),('mar','Morocco','MAR','🇲🇦','F'),('cro','Croatia','CRO','🇭🇷','F'),
('bra','Brazil','BRA','🇧🇷','G'),('srb','Serbia','SRB','🇷🇸','G'),('sui','Switzerland','SUI','🇨🇭','G'),('cmr','Cameroon','CMR','🇨🇲','G'),
('por','Portugal','POR','🇵🇹','H'),('gha','Ghana','GHA','🇬🇭','H'),('uru','Uruguay','URU','🇺🇾','H'),('kor','South Korea','KOR','🇰🇷','H')
on conflict (id) do update set
  name = excluded.name,
  code = excluded.code,
  flag_emoji = excluded.flag_emoji,
  group_stage = excluded.group_stage;

insert into public.matches (id, home_team_id, away_team_id, kickoff_at, stage, home_score, away_score, status, facts) values
('match-001','arg','ksa','2026-06-11T18:00:00Z','Group stage', null, null, 'scheduled', '[
  "Argentina enter with one of the tournament''s deepest attacking rotations.",
  "Saudi Arabia''s compact midfield makes early tempo control important.",
  "Set pieces could tilt a match expected to be tight before halftime."
]'::jsonb),
('match-002','usa','wal','2026-06-12T01:00:00Z','Group stage', null, null, 'scheduled', '[
  "The United States press most aggressively after opponent goal kicks.",
  "Wales are dangerous when transitions start from the left channel.",
  "Both teams rely on wide service, so fullback matchups should matter."
]'::jsonb),
('match-003','fra','den','2026-06-13T20:00:00Z','Group stage', null, null, 'scheduled', '[
  "France''s forwards thrive when they can isolate defenders in space.",
  "Denmark''s back three can become a five when protecting a lead.",
  "The midfield duel may decide how many clean chances France generate."
]'::jsonb),
('match-004','bra','sui','2026-06-14T22:00:00Z','Group stage', null, null, 'scheduled', '[
  "Brazil can rotate creators without losing one-on-one threat.",
  "Switzerland defend the box well and rarely give up central lanes.",
  "An early Brazil goal would force Switzerland into a more open shape."
]'::jsonb)
on conflict (id) do update set
  home_team_id = excluded.home_team_id,
  away_team_id = excluded.away_team_id,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  status = excluded.status,
  facts = excluded.facts;

insert into public.quiz_questions (id, question, options, correct_index, category) values
('q1','Which country has won the most men''s World Cups?', '["Germany","Argentina","Brazil","Italy"]'::jsonb, 2, 'History'),
('q2','How many teams play in this companion''s group stage setup?', '["24","28","32","48"]'::jsonb, 2, 'Format'),
('q3','A perfect score prediction is worth how many points?', '["5","10","15","20"]'::jsonb, 1, 'Scoring'),
('q4','Which team is represented by the flag 🇯🇵?', '["South Korea","Japan","Saudi Arabia","Iran"]'::jsonb, 1, 'Teams'),
('q5','Which role usually takes corner kicks?', '["Winger","Center back","Goalkeeper","Referee"]'::jsonb, 0, 'Tactics'),
('q6','What does a draw mean?', '["Both teams scored","No goals were scored","Scores are level","One team forfeited"]'::jsonb, 2, 'Rules'),
('q7','Which country is in Group G in this app?', '["Brazil","Portugal","Spain","France"]'::jsonb, 0, 'Groups'),
('q8','What starts a match?', '["Throw-in","Kickoff","Corner","Penalty"]'::jsonb, 1, 'Rules'),
('q9','Which tournament phase comes after groups?', '["Final","Knockout rounds","Qualifying","Friendly matches"]'::jsonb, 1, 'Format'),
('q10','How many options does each quiz question show?', '["2","3","4","5"]'::jsonb, 2, 'Quiz')
on conflict (id) do update set
  question = excluded.question,
  options = excluded.options,
  correct_index = excluded.correct_index,
  category = excluded.category;
