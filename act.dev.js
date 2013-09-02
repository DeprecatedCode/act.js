var reqs = 'act calc ctrl http prop view wait'.split(' ').map(function (req) {
    return 'src/' + req;
});

define(reqs, function (act) {
    return act;
});
