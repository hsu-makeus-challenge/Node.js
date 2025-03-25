select *
from mission
where status = 'ready'
    and user_id in (
        select id
        from user
        where adress = '안암동'
    )
        