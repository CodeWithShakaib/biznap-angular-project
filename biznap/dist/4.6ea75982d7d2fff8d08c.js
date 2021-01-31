(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    FQ1g: function (n, t, e) {
      'use strict';
      e.r(t),
        e.d(t, 'AboutModule', function () {
          return l;
        });
      var c = e('ofXK'),
        i = e('sYmb'),
        a = e('YUcS'),
        r = e('vvyD'),
        o = e('tyNb'),
        s = e('4u49'),
        u = e('AytR'),
        m = e('fXoL'),
        p = e('Wp6s');
      const d = [
        {
          path: '',
          component: (() => {
            class n {
              constructor() {
                this.version = u.a.version;
              }
              ngOnInit() {}
            }
            return (
              (n.ɵfac = function (t) {
                return new (t || n)();
              }),
              (n.ɵcmp = m.Ib({
                type: n,
                selectors: [['app-about']],
                decls: 20,
                vars: 0,
                consts: [
                  [1, 'container'],
                  ['translate', ''],
                ],
                template: function (n, t) {
                  1 & n &&
                    (m.Ub(0, 'div', 0),
                    m.Nc(1, '\n  '),
                    m.Ub(2, 'mat-card'),
                    m.Nc(3, '\n    '),
                    m.Ub(4, 'h1'),
                    m.Nc(5, '\n      '),
                    m.Ub(6, 'mat-card-title', 1),
                    m.Nc(7, 'APP_NAME'),
                    m.Tb(),
                    m.Nc(8, '\n    '),
                    m.Tb(),
                    m.Nc(9, '\n    '),
                    m.Ub(10, 'mat-card-content'),
                    m.Nc(11, '\n      '),
                    m.Nc(12, '\n      '),
                    m.Ub(13, 'p'),
                    m.Nc(
                      14,
                      '\n        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus amet illum praesentium modi. Amet veniam\n        impedit rerum, recusandae cumque culpa praesentium aspernatur voluptate commodi eveniet expedita quod ad aperiam\n        animi?\n      '
                    ),
                    m.Tb(),
                    m.Nc(15, '\n      '),
                    m.Nc(16, '\n    '),
                    m.Tb(),
                    m.Nc(17, '\n  '),
                    m.Tb(),
                    m.Nc(18, '\n'),
                    m.Tb(),
                    m.Nc(19, '\n'));
                },
                directives: [p.a, p.g, i.a, p.c],
                styles: [
                  '.container[_ngcontent-%COMP%]{text-align:center;padding:1rem}.mat-icon[_ngcontent-%COMP%]{vertical-align:middle}',
                ],
              })),
              n
            );
          })(),
          data: { title: Object(s.a)('About') },
        },
      ];
      let b = (() => {
          class n {}
          return (
            (n.ɵmod = m.Mb({ type: n })),
            (n.ɵinj = m.Lb({
              factory: function (t) {
                return new (t || n)();
              },
              providers: [],
              imports: [[o.i.forChild(d)], o.i],
            })),
            n
          );
        })(),
        l = (() => {
          class n {}
          return (
            (n.ɵmod = m.Mb({ type: n })),
            (n.ɵinj = m.Lb({
              factory: function (t) {
                return new (t || n)();
              },
              imports: [[c.c, i.b, a.a, r.a, b]],
            })),
            n
          );
        })();
    },
  },
]);
