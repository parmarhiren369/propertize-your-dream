import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const showcaseImages = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    title: 'Luxury Living',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    title: 'Modern Design',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    title: 'Timeless Elegance',
  },
];

export default function ScrollShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Experience Excellence
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Discover Exceptional
            <span className="text-gradient-gold block">Living Spaces</span>
          </h2>
        </motion.div>

        <div className="space-y-40">
          {showcaseImages.map((image, index) => {
            const isEven = index % 2 === 0;
            return (
              <ShowcaseItem
                key={index}
                image={image}
                index={index}
                isEven={isEven}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ShowcaseItem({
  image,
  index,
  isEven,
  scrollYProgress,
}: {
  image: { url: string; title: string };
  index: number;
  isEven: boolean;
  scrollYProgress: any;
}) {
  const ref = useRef(null);
  const { scrollYProgress: itemProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(itemProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(itemProgress, [0, 0.5], [0, 1]);
  const x = useTransform(itemProgress, [0, 1], [isEven ? -100 : 100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
    >
      {/* Image */}
      <motion.div
        style={{ scale }}
        className="w-full lg:w-2/3 relative group"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-elevated">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        
        {/* Floating Accent */}
        <div className={`absolute -z-10 ${isEven ? '-right-10' : '-left-10'} -bottom-10 w-full h-full rounded-3xl bg-gradient-gold opacity-20 blur-2xl`} />
      </motion.div>

      {/* Content */}
      <div className="w-full lg:w-1/3 text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-primary text-8xl font-display font-bold opacity-20"
        >
          0{index + 1}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground -mt-10"
        >
          {image.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-muted-foreground mt-4"
        >
          Experience the pinnacle of refined living with properties that 
          redefine luxury and comfort in every detail.
        </motion.p>
      </div>
    </motion.div>
  );
}
