import { sanity } from '@lib/sanity';
import { Box } from '@mantine/core';
import type { HomepageSettings } from '@typedefs/sanity';
import { useState, useEffect } from 'react';
import classes from '@layouts/RootLayout.module.css';
import '@mantine/carousel/styles.css';
import CallToAction from '@components/HomePage/CallToAction';
import FeaturedProducts from '@components/HomePage/FeaturedProducts';
import { useOutletContext } from 'react-router-dom';
import type { OutletContext } from '@layouts/RootLayout';
import QualityDeclaration from '@components/HomePage/QualityDeclaration';

export default function Home() {
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings | null>(null);
  const { headerHeight } = useOutletContext<OutletContext>();

  useEffect(() => {
    sanity
      .fetch<HomepageSettings>(
        `*[_type == "homepage"][0]{
          heroText,
          ctaButtonLabel,
          ctaButtonLink,
          subtext,
          heroVideo{
            asset->{
              url
            }
          },
          featuredProducts[]->{
            _id,
            title,
            sku,
            slug,
            image{
              asset->{
                url
              }
            },
            lowRes{
              asset->{
                url
              }
            },
            range->{
              _id,
              slug
            }
          }
        }`,
      )
      .then((res) => setHomepageSettings(res))
      .catch((err) => console.error('Couldn’t fetch homepage settings:', err));
  }, []);

  if (!homepageSettings) {
    return null;
  }

  return (
    <>
      <title>Celeste Stone | Silica-Free Surfaces</title>
      <meta
        name="description"
        content="Natural aesthetics, reimagined without a single crystal of compromise."
      />
      <link rel="canonical" href="https://celestestone.com.au/" />
      <Box
        className={classes.heroSection}
        style={{
          transform: `translateY(-${headerHeight}px)`,
        }}
      >
        <Box className={classes.heroVideoWrap}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={classes.heroVideo}
            src={homepageSettings?.heroVideo?.asset.url}
          />
        </Box>
        <Box className={classes.heroOverlay} />
        <CallToAction homepageSettings={homepageSettings} />
      </Box>

      <FeaturedProducts homepageSettings={homepageSettings} />

      <QualityDeclaration />
    </>
  );
}
