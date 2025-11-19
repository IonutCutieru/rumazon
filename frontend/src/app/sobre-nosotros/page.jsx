'use client'
import Image from 'next/image'
import styles from './page.module.css'

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.twoCol}>
        <div className={styles.text}>
          <h1 className={styles.title}>Sobre Rumazon</h1>
          <p className={styles.lead}>
            Rumazon nace con la idea de hacer accesible productos de calidad a cualquier persona, incluso en los medios más rurales.
          </p>
            Nos esforzamos en ofrecer una experiencia de compra sencilla, confiable y rápida.
          <p className={styles.paragraph}>
            Seleccionamos cuidadosamente cada artículo y trabajamos con proveedores de confianza para darte lo mejor y al mejor precio.
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/sobre-nosotros1.jpg"
            alt="Sobre Rumazon"
            width={1200}
            height={800}
            className={styles.image}
            priority
          />
        </div>
      </section>

      <section className={styles.twoColReverse}>
        <div className={styles.imageWrapper}>
          <Image
            src="/sobre-nosotros2.png"
            alt="Nuestra historia"
            width={1200}
            height={800}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.text}>
          <h2 className={styles.subtitle}>Nuestra historia</h2>
          <p className={styles.paragraph}>
            Con sede en Silistea-Gumesti, un pequeño pueblo de Rumania, nuestros CEOs acostumbrados a una vida rural en Europa del Este vieron una oportunidad 
            de negocio favorable al observar la falta de acceso a productos de calidad sumado al auge de la tecnologia en esta zona debido al retraso
            comparado con europa occidental,en ese momento decidieron aprovechar y fundar Rumazon.
          </p>
          <p className={styles.paragraph}>
            A dia de hoy seguimos innovando y buscando nuevas formas de mejorar la experiencia de compra.
          </p>
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Nuestro equipo</h2>

        <div className={styles.teamGrid}>
          {[
            { id: 1, name: 'Ana Pérez', role: 'Fundadora', img: '/team-1.jpg' },
            { id: 2, name: 'Luis García', role: 'Operaciones', img: '/team-2.jpg' },
            { id: 3, name: 'María López', role: 'Atención al cliente', img: '/team-3.jpg' },
          ].map(member => (
            <article key={member.id} className={styles.teamCard}>
              <div className={styles.teamImage}>
                <Image
                  src={member.img}
                  alt={member.name}
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
