/**
 * Fyzzo Voyage Blog — lists articles from posts.json.
 * To publish a new article: add its .html page to this folder and add an entry
 * at the TOP of posts.json (newest first). The blog page and the homepage
 * "Latest From Fyzzo Voyage" section update automatically.
 */
(function () {
    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function fmtDate(iso) {
        var d = new Date(iso + 'T12:00:00');
        return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function card(p) {
        return '<a class="post-card" href="' + esc(p.slug) + '.html">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || '') + '" loading="lazy">' +
            '<div class="post-card-body">' +
            '<div class="post-meta"><span class="post-tag">' + esc(p.category) + '</span><span>' + esc(fmtDate(p.date)) + '</span><span>· ' + esc(p.readMinutes) + ' min read</span></div>' +
            '<h2>' + esc(p.title) + '</h2>' +
            '<p>' + esc(p.excerpt) + '</p>' +
            '<span class="post-read">Read article &rarr;</span>' +
            '</div></a>';
    }

    function render(list, posts, category) {
        var shown = category && category !== 'All' ? posts.filter(function (p) { return p.category === category; }) : posts;
        list.innerHTML = shown.length ? shown.map(card).join('') : '<p class="blog-empty">No articles in this category yet.</p>';
    }

    document.addEventListener('DOMContentLoaded', function () {
        var list = document.getElementById('blogList');
        if (!list) return;
        var exclude = list.getAttribute('data-exclude');
        var limit = parseInt(list.getAttribute('data-limit') || '0', 10);
        var filters = document.getElementById('blogFilters');

        fetch('posts.json', { cache: 'no-cache' })
            .then(function (r) { return r.json(); })
            .then(function (posts) {
                posts.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
                if (exclude) posts = posts.filter(function (p) { return p.slug !== exclude; });
                if (limit) posts = posts.slice(0, limit);
                render(list, posts, 'All');

                if (filters) {
                    var cats = ['All'].concat(posts.map(function (p) { return p.category; }).filter(function (c, i, a) { return c && a.indexOf(c) === i; }));
                    filters.innerHTML = cats.map(function (c, i) {
                        return '<button type="button" class="blog-filter' + (i === 0 ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
                    }).join('');
                    filters.addEventListener('click', function (e) {
                        var b = e.target.closest('.blog-filter');
                        if (!b) return;
                        filters.querySelectorAll('.blog-filter').forEach(function (x) { x.classList.toggle('active', x === b); });
                        render(list, posts, b.getAttribute('data-cat'));
                    });
                }
            })
            .catch(function () {
                list.innerHTML = '<p class="blog-empty">Articles could not be loaded. Please refresh the page.</p>';
            });
    });
})();
