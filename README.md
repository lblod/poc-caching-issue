# Poc caching issue

wip, bug not reproducible without the frontend yet (could be because it needs to be logged in?)

### How to 

- run docker-compose up -d
- wait till the migrations are done
- run npm install
- run `node bug.mjs`
    - if it prints "all good", it means there is no bug and cache behave normally
    - otherwise, it should print "bug! should have included 2 ministers"

