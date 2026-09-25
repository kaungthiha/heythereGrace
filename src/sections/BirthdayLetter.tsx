import { PhotoFrame } from '../components/PhotoFrame';
import { Sticker } from '../components/Sticker';
import { T } from '../components/Text';
import { TornEdge } from '../components/TornEdge';
import { letter } from '../content/letter';
import { getPhoto } from '../content/photos';
import { siteConfig } from '../content/site';
import { useInView } from '../hooks/useInView';
import { formatDate } from '../utils/dates';
import './personal.css';

/** The quiet part. Narrow, calm, no confetti. */
export function BirthdayLetter() {
  const ref = useInView<HTMLElement>();
  return (
    <section id="letter" ref={ref} className="section letter" data-palette="warm" aria-labelledby="letter-title">
      <TornEdge variant={0} />
      <div className="wrap">
        <div className="letter__top rv">
          <Sticker name="birthday/envelope" width={84} rotate={-6} />
          <p className="eyebrow">{letter.eyebrow}</p>
        </div>
        <article className="letter__paper rv">
          {letter.photo && (
            <PhotoFrame photo={getPhoto(letter.photo)} variant="taped" tape rotate={3} caption={false} className="letter__photo" sizes="220px" />
          )}
          <p className="letter__date">{formatDate(letter.date)}</p>
          <h2 id="letter-title" className="letter__greeting">
            <T>{letter.greeting}</T>
          </h2>
          <div className="letter__body">
            {letter.paragraphs.map((p, i) => (
              <p key={i}>
                <T>{p}</T>
              </p>
            ))}
          </div>
          <p className="letter__signoff">
            <T>{letter.signoff}</T>
          </p>
          <p className="letter__signature hand">
            <T>{siteConfig.author.name}</T>
          </p>
        </article>
      </div>
    </section>
  );
}
