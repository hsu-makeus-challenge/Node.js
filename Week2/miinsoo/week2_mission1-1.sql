select * 
from mission 
where created_at < (select created_at from mission where id = 3)
    and status = 'progress' and status = 'completed'
    order by create_at desc limit 15