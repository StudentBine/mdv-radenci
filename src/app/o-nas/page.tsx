export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">O društvu</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl mb-6">
          Mladinsko društvo Vrelec Radenci je bilo ustanovljeno z namenom povezovanja mladih
          v lokalni skupnosti in organiziranja različnih aktivnosti.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Naša vizija</h2>
        <p>
          Postati vodilno mladinsko društvo v regiji, ki mladim omogoča osebnostno rast,
          ustvarjalnost in aktivno sodelovanje v družbi.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Naše vrednote</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Spoštovanje raznolikosti</li>
          <li>Sodelovanje in timsko delo</li>
          <li>Ustvarjalnost in inovativnost</li>
          <li>Aktivno državljanstvo</li>
          <li>Trajnostni razvoj</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Naše aktivnosti</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Organizacija kulturnih dogodkov</li>
          <li>Športne aktivnosti in tekmovanja</li>
          <li>Izobraževalni delavnice</li>
          <li>Prostovoljne akcije</li>
          <li>Mednarodno sodelovanje</li>
        </ul>
      </div>
    </div>
  );
}
