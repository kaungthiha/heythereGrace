import { T } from '../components/Text';
import { TornEdge } from '../components/TornEdge';
import { siteConfig } from '../content/site';
import { stats } from '../content/stats';
import { useInView } from '../hooks/useInView';
import { daysSince, formatDate } from '../utils/dates';
import './personal.css';

/**
 * "Us, by the numbers", printed as a receipt. Days together is always calculated live;
 * anything else comes from src/content/stats.ts and is never made up.
 */
export function RelationshipStats() {
  const ref = useInView<HTMLElement>();
  const start = siteConfig.relationship.startDate;
  const days = Math.max(0, daysSince(start, new Date()));
  const showTodo = stats.length === 0 && import.meta.env.DEV;

  return (
    <section id="numbers" ref={ref} className="section stats" data-palette="blue" aria-labelledby="stats-title">
      <TornEdge variant={1} flip />
      <div className="wrap stats__wrap">
        <div className="stats__receipt rv rv--drop">
          <h2 id="stats-title" className="stats__title">
            {siteConfig.stats.title}
          </h2>
          <p className="stats__since">since {formatDate(start)}</p>
          <hr />
          <dl className="stats__lines">
            <div className="stats__line stats__line--big">
              <dt>days together</dt>
              <dd>{days.toLocaleString('en-US')}</dd>
            </div>
            <div className="stats__line">
              <dt>hours, roughly</dt>
              <dd>{(days * 24).toLocaleString('en-US')}</dd>
            </div>
            {stats.map((s) => (
              <div className="stats__line" key={s.id}>
                <dt>
                  <T>{s.label}</T>
                  {s.note && (
                    <small>
                      {' '}
                      <T>{s.note}</T>
                    </small>
                  )}
                </dt>
                <dd>
                  <T>{s.value}</T>
                </dd>
              </div>
            ))}
          </dl>
          {showTodo && (
            <p className="stats__todo">
              <span className="todo">[KT: Add real stats in src/content/stats.ts — this note only shows in development]</span>
            </p>
          )}
          <hr />
          <p className="stats__foot">* and counting</p>
          <div className="stats__barcode" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
