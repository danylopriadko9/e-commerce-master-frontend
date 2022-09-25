import React from 'react';
import styles from './InfoBlock.module.scss';

const InfoBlock = () => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.container}>
        <h1>
          Профессиональное оборудование для кухни предприятий общественного
          питания (общепита): ресторана, кафе, бара, столовой
        </h1>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptinBlock}>
            <p>
              Хорошая работа любого заведения с кухней напрямую зависит от того,
              установлено ли на ней профессиональное кухонное оборудование,
              которое, помимо этого, должно быть еще и современным. Любая
              техника постоянно совершенствуется, именно поэтому необходимо
              следить за всеми инновациями, что позволит регулярно делать
              обновления в помещении, где готовится еда. Учитывая абсолютно все
              нюансы, можно подобрать действительно качественную продукцию.
            </p>
            <p>
              При помощи кухонной техники можно измельчать, нарезать,
              перемешивать, замешивать, а также взбивать различные ингредиенты.
              Любое профессиональное оборудование для кухни бывает холодильным
              (холодильные шкафы, морозильные камеры), тепловым (приборы для
              жарки, варки), электромеханическим (оборудование для первой
              обработки пищи) и нейтральным (кухонные столы, стеллажи, раковины,
              весы).
            </p>
            <p>
              Сейчас можно найти много иностранных и отечественных компаний,
              которые занимаются производством и продажей профессионального
              кухонного оборудования. Вы сможете подобрать для себя идеальное
              конструкторское{' '}
            </p>
          </div>
          <div className={styles.descriptinBlock}>
            <p>
              удачным сочетанием дизайна, качества и стоимости. Большинство
              известных производителей оборудования для кухни являются
              авторитетными компаниями, которые проверены безупречностью
              выполненных работ и имеют в своем арсенале награды престижных
              международных выставок. Приобретая промышленное кухонное
              оборудование для общепита от компаний, обладающих всеми
              необходимыми разрешениями и сертификатами, вы приобретете лучшие
              образцы мировой индустрии кухонной техники.
            </p>
            <p>
              Покупка кухонного оборудования — дело ответственное. Для
              правильного выбора необходимых составляющих для будущего пищеблока
              следует сразу определиться с ассортиментом блюд, а также учесть
              планируемое число гостей для вашего заведения. Еще один важный
              фактор при выборе конкретной техники - это площадь помещения. К
              примеру, если у вас большой ресторан, в котором вмещается огромное
              число посадочных мест, то необходимо покупать мощную технику
              больших объемов. Если необходимо приобрести кухонное оборудование
              для общепита в виде небольшого кафе, то оборудование должно иметь
              в несколько раз меньшие размеры.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
