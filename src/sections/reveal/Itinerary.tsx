import type { CSSProperties } from 'react';
import { Doodle } from '../../components/Doodle';
import { Sticker } from '../../components/Sticker';
import { T } from '../../components/Text';
import type { ItineraryDay, ItineraryItem, TripRevealContent } from '../../content/types';
import { useInView } from '../../hooks/useInView';
import { formatDate } from '../../utils/dates';

/** The plan, drawn as a dashed route with day cards along it. Every block is optional. */
export function Itinerary({ trip }: { trip: TripRevealContent }) {
  const { planIntro, departure, days, lodging, packing, weather, notes, map } = trip;
  return (
    <div className="plan">
      {planIntro && (
        <h3 className="display plan__intro rv">
          <T>{planIntro}</T>
        </h3>
      )}

      {departure && (
        <div className="plan__ticket rv">
          <div className="plan__ticket-main">
            <span className="plan__ticket-label">departure</span>
            {departure.time && (
              <span className="plan__ticket-time">
                <T>{departure.time}</T>
              </span>
            )}
            {departure.from && (
              <span>
                from <T>{departure.from}</T>
              </span>
            )}
          </div>
          <div className="plan__ticket-stub">
            <Sticker name="trip/suitcase" width={48} rotate={-6} />
            {departure.driveTime && (
              <span>
                <T>{departure.driveTime}</T>
              </span>
            )}
          </div>
          {departure.note && (
            <p className="plan__ticket-note hand">
              <T>{departure.note}</T>
            </p>
          )}
        </div>
      )}

      <ol className="plan__route" role="list">
        {days.map((day, i) => (
          <Day key={day.date + i} day={day} index={i} />
        ))}
      </ol>

      <div className="plan__extras">
        {lodging && (
          <div className="plan__card plan__card--lodging rv">
            <Doodle name="tent" size={36} className="plan__card-icon" />
            <p className="plan__card-title">Where we’re staying</p>
            <p className="plan__lodging-name">
              <T>{lodging.name}</T>
            </p>
            {lodging.address && (
              <p className="plan__muted">
                <T>{lodging.address}</T>
              </p>
            )}
            {(lodging.checkIn || lodging.checkOut) && (
              <p className="plan__muted">
                {lodging.checkIn && (
                  <>
                    check-in <T>{lodging.checkIn}</T>
                  </>
                )}
                {lodging.checkIn && lodging.checkOut && ' · '}
                {lodging.checkOut && (
                  <>
                    check-out <T>{lodging.checkOut}</T>
                  </>
                )}
              </p>
            )}
            {lodging.note && (
              <p className="hand plan__card-note">
                <T>{lodging.note}</T>
              </p>
            )}
            {lodging.link && (
              <a href={lodging.link} target="_blank" rel="noreferrer">
                Details ↗
              </a>
            )}
          </div>
        )}

        {packing && packing.length > 0 && (
          <div className="plan__card plan__card--packing rv" style={{ '--i': 1 } as CSSProperties}>
            <Sticker name="trip/backpack" width={58} rotate={8} className="plan__card-icon" />
            <p className="plan__card-title">Pack</p>
            <ul role="list" className="plan__checklist">
              {packing.map((item, i) => (
                <li key={i}>
                  <T>{item}</T>
                </li>
              ))}
            </ul>
          </div>
        )}

        {weather && (
          <div className="plan__card plan__card--weather rv" style={{ '--i': 2 } as CSSProperties}>
            <Sticker name="trip/cloud" width={72} className="plan__card-icon" />
            <p className="plan__card-title">Weather</p>
            <p>
              <T>{weather}</T>
            </p>
          </div>
        )}

        {notes?.map((note, i) => (
          <div key={i} className="plan__card rv" style={{ '--i': i + 3 } as CSSProperties}>
            {note.icon && <Doodle name={note.icon} size={36} className="plan__card-icon" />}
            <p className="plan__card-title">
              <T>{note.title}</T>
            </p>
            <p>
              <T>{note.text}</T>
            </p>
          </div>
        ))}
      </div>

      {map && (
        <p className="plan__map rv">
          <a className="btn btn--light" href={map.href} target="_blank" rel="noreferrer">
            <Doodle name="pin" size={22} /> {map.label} ↗
          </a>
        </p>
      )}
    </div>
  );
}

function Day({ day, index }: { day: ItineraryDay; index: number }) {
  const ref = useInView<HTMLLIElement>();
  return (
    <li className="plan__day" ref={ref}>
      <div className="plan__day-tag rv rv--left">
        <span className="plan__day-date">{formatDate(day.date, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        <span className="display plan__day-title">
          <T>{day.title}</T>
        </span>
        {day.subtitle && (
          <span className="plan__day-subtitle hand">
            <T>{day.subtitle}</T>
          </span>
        )}
      </div>
      <ol className="plan__items" role="list">
        {day.items.map((item, i) => (
          <Item key={i} item={item} i={i + index} />
        ))}
      </ol>
    </li>
  );
}

function Item({ item, i }: { item: ItineraryItem; i: number }) {
  return (
    <li className="plan__item rv" style={{ '--i': (i % 4) + 1 } as CSSProperties}>
      <span className="plan__item-dot" aria-hidden="true">
        <Doodle name={item.icon ?? 'star'} size={26} />
      </span>
      <div className="plan__item-body">
        {item.time && (
          <p className="plan__item-time hand">
            <T>{item.time}</T>
          </p>
        )}
        <p className="plan__item-title">
          <T>{item.title}</T>
        </p>
        {item.location && (
          <p className="plan__muted">
            <Doodle name="pin" size={16} weight={3} className="plan__inline-icon" /> <T>{item.location}</T>
          </p>
        )}
        {item.description && (
          <p>
            <T>{item.description}</T>
          </p>
        )}
        <div className="plan__chips">
          {item.travelTime && (
            <span className="plan__chip">
              <Doodle name="car" size={18} weight={3} className="plan__inline-icon" /> <T>{item.travelTime}</T>
            </span>
          )}
          {item.reservation && (
            <span className="plan__chip">
              <Doodle name="sign" size={16} weight={3} className="plan__inline-icon" /> <T>{item.reservation}</T>
            </span>
          )}
        </div>
        {item.note && (
          <p className="hand plan__item-note">
            <T>{item.note}</T>
          </p>
        )}
        {item.link && (
          <a href={item.link} target="_blank" rel="noreferrer">
            More ↗
          </a>
        )}
      </div>
    </li>
  );
}
