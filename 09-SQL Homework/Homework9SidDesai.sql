use sakila;
select first_name, last_name from actor; #question 1a

select concat(upper(first_name)," ",upper(last_name)) 
as "Actor Name" from actor; # question 1b

select actor_id, first_name, last_name from actor
where first_name = "Joe"; #question 2b

select * from actor where last_name like '%GEN%'; #question 2c

select country_id, country from country
where country in ("Afghanistan","Bangladesh","China"); #question 2d

alter table actor
add column `description` blob; #question 3a

alter table actor
drop column `description`; #question 3b

select distinct last_name, 
(select count(*) from actor as actors where actor.last_name = actors.last_name)
as "Number with last name"
from actor; #question 4a

select distinct last_name, 
(select count(*) from actor as actors where actor.last_name = actors.last_name)
as "Number with last name"
from actor
where (select count(*) from actor as actors 
where actor.last_name = actors.last_name)>=2; #question 4b

update actor
set first_name = "Harpo"
where first_name = "Groucho"
and last_name = "Williams"; #question 4c

update actor
set first_name = "Groucho"
where first_name = "Harpo"; #question 4d

create table if not exists address (
address_id smallint(5) unsigned not null auto_increment,
address varchar(50) not null,
address2 varchar(50) default null,
district varchar(20) not null,
city_id smallint(5) unsigned not null,
postal_code varchar(10) default null,
phone varchar(20) not null,
location geometry not null,
last_update timestamp not null default current_timestamp on update current_timestamp,
primary key(address_id),
key `idx_fx_city_id` (city_id),
spatial key `idx_location` (location),
constraint `fk_address_city` foreign key (`city_id`) 
references city (city_id) on delete restrict on update cascade); #question 5a

select staff.first_name, staff.last_name, address.address from staff
join address
where staff.address_id = address.address_id; #question 6a

select sum(payment.amount) from payment 
join staff
where payment.staff_id = staff.staff_id and
payment.payment_date like "2005-08%";#question 6b

select distinct title, (select count(*) from film_actor where film_actor.film_id = film.film_id) as "Number of Actors"
from film
inner join film_actor on film.film_id = film_actor.film_id; #question 6c

select distinct title, (select count(*) from inventory where inventory.film_id = film.film_id) as "Number in Inventory"
from film
inner join inventory on inventory.film_id = film.film_id;#question 6d

select distinct first_name, last_name, 
(select sum(amount) from payment where payment.customer_id = customer.customer_id) as "Total Amount Paid"
from customer
join payment
on payment.customer_id=customer.customer_id;#question 6e

select title from film where title like "K%" or "Q%" and language_id in 
(select language_id from language where name = "English");#question 7a

select first_name, last_name from actor where actor_id in 
(select actor_id from film_actor where film_id in
(select film_id from film where title = "Alone Trip")
);#question 7b

select cu.first_name,cu.last_name,cu.email 
from customer cu
join address a
on cu.address_id = a.address_id
join city ci
on a.city_id=ci.city_id
join country co
on ci.country_id = co.country_id
where co.country = "Canada";#question 7c

select f.title from film f
join film_category fc
on f.film_id = fc.film_id
join category c
on fc.category_id = c.category_id
where c.name = "Family";#question 7d

select title from film where film_id in
(select film_id from film_category where category_id in
(select category_id from category where name = "Family")
);#question 7d again

select distinct title, (select count(*) from rental r  where r.inventory_id = i.inventory_id ) as "Number of Rentals"
from film f
join inventory i
on f.film_id=i.film_id
order by (select count(*) from rental r  where r.inventory_id = i.inventory_id ) desc; #question 7e

select city,(select sum(amount) from payment p where p.staff_id = sta.staff_id) as Revenue
from city c
join address a
on a.city_id=c.city_id
join store sto 
on sto.address_id = a.address_id
join staff sta
on sto.store_id=sta.store_id
order by Revenue desc;#question 7f

select sto.store_id,ci.city,co.country
from store sto
join address a 
on a.address_id = sto.address_id
join city ci
on ci.city_id = a.city_id
join country co
on co.country_id = ci.country_id;#question 7

select c.name as "Genre",sum(amount) as "Total Sales"
from payment p
join rental r
on p.rental_id = r.rental_id
join inventory i
on i.inventory_id=r.inventory_id
join film f
on f.film_id=i.film_id
join film_category fc
on fc.film_id=f.film_id
join category c 
on fc.category_id=c.category_id
group by c.name
order by sum(amount) desc
limit 5;#question 7h

create or replace view top_five_genres as
select c.name as "Genre",sum(amount) as "Total Sales"
from payment p
join rental r
on p.rental_id = r.rental_id
join inventory i
on i.inventory_id=r.inventory_id
join film f
on f.film_id=i.film_id
join film_category fc
on fc.film_id=f.film_id
join category c 
on fc.category_id=c.category_id
group by c.name
order by sum(amount) desc
limit 5;#question 8a

select * from top_five_genres;#question 8b

drop view top_five_genres;#question 8c