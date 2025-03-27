select *
from mission
where status = 'ready'
    and user_id in (
        select id
        from user
        where adress = '안암동'
    )
    and created_at < (select created_at from mission where id = 3)
    order by create_at desc limit 15
        