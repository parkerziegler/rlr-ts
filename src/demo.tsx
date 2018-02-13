/* eslint-disable no-magic-numbers */
import * as React from 'react';
import { connect } from 'react-redux';
import { chunk } from 'lodash';

/* Invert comments for immutable */
import { Link, Fragment } from 'redux-little-router';
// import { ImmutableLink as Link, ImmutableFragment as Fragment } from 'redux-little-router';

const styles = {
  gallery: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    paddingTop: '20px'
  },
  column: {
    display: 'flex',
    flexBasis: '50%',
    flexDirection: 'column' as 'column',
    flexWrap: 'wrap' as 'wrap',
    fontSize: 0
  },
  image: {
    width: '100%'
  },
  container: {
    maxWidth: '1024px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20px'
  },
  tagline: {
    textAlign: 'center'
  },
  secondary: {
    fontSize: '16px'
  },
  primary: {
    fontSize: '36px'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around' as 'space-around',
    paddingBottom: '20px'
  },
  noMatchImage: {
    maxWidth: '100%'
  }
};

const COLUMN_COUNT = 2;

const columnize = (array: any, columns: any) => {
  const remainder = array.length % columns;
  const chunkSize = Math.floor(array.length / columns);
  const firstChunkSize = chunkSize + remainder;
  const firstChunk = array.slice(0, firstChunkSize);
  return [firstChunk].concat(
    chunk(array.slice(firstChunkSize, array.length), chunkSize)
  );
};

interface GalleryProps {
  images: any[];
  columns: number;
};

const Gallery: React.SFC<GalleryProps> = ({ images, columns, ...rest }) => {

  return (
    <div style={styles.gallery} {...rest}>
    {columnize(images, columns).map((column, index) =>
      <div key={index} style={styles.column}>
        {column.map((image: any, imageIndex: number) =>
          <img key={imageIndex} style={styles.image} src={image} />
        )}
      </div>
    )}
    </div>
  );
};

// eslint-disable-next-line react/no-multi-comp
const Demo: React.SFC<{ location: any }> = ({ location }) => {
  const demoRoutes = ['/cheese', '/cat', '/dog', '/hipster'];
  return (
    <div style={styles.container}>
      <Fragment forRoute="/" style={styles.container}>
        <div>
          <h1 style={styles.tagline}>
            <span style={styles.secondary}>A Compendium of</span>
            <br />
            <span style={styles.primary}>Ipsums and GIFs</span>
          </h1>

          <div style={styles.nav}>
            <Link href={{ pathname: '/cheese', query: { is: 'cheese' } }}>
              Cheese
            </Link>
            <Link href="/dog" style={{ color: 'red' }}>Dog</Link>
            <Link href="/cat?is=cat">Cat</Link>
            <Link href="/hipster">Hipster</Link>
            <Link
              href="/nonexistent"
              activeProps={{
                style: {
                  backgroundColor: '#e32636'
                }
              }}
            >
              My Design Skills
            </Link>
          </div>

          <div>
            {demoRoutes.map(route =>
              <Fragment key={route} forRoute={route}>
                <div>
                  <p>
                    {location.result && location.result.text}
                  </p>
                  <Gallery
                    images={location.result && location.result.images}
                    columns={COLUMN_COUNT}
                  />
                </div>
              </Fragment>
            )}
          </div>

          <Fragment forRoute="/">
            <p>Pickum ipsum!</p>
          </Fragment>

          <Fragment forNoMatch>
            <div>
              <h2>FOUR O'FOUR</h2>
              <p>Looks like you found something that doesn't exist!</p>
              <img
                style={styles.noMatchImage}
                src="http://i1.kym-cdn.com/photos/images/original/001/018/866/e44.png"
              />
            </div>
          </Fragment>
        </div>
      </Fragment>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  /* Invert comments for immutable */
  location: state.router
  // location: state.get('router').toJS()
});

export default connect(mapStateToProps)(Demo);
