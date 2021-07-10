/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : regdoll

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 10/07/2021 22:39:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for atom
-- ----------------------------
DROP TABLE IF EXISTS `atom`;
CREATE TABLE `atom`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `en_name` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '原子英文名',
  `ch_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '原子中文名',
  `quality` float NOT NULL COMMENT '原子质量',
  `ele_number` float NOT NULL COMMENT '原子电子数',
  `notice` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '注意',
  `finder` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '发现者',
  `meltingPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '熔点',
  `density` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密度',
  `valence` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '化合价',
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '位置',
  `matterState` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '物态（常温）',
  `IonicCharge` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '离子电荷量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of atom
-- ----------------------------
INSERT INTO `atom` VALUES (1, 'H', '氢', 1.00794, 1, '氢是一种化学元素，原子序数为1.H的原子质量为1.00794U，是元素周期表中最轻的元素氢是一种化学元素，其化学符号为H，原子序数为1。氢的原子量为1.00794U，是元素周期表中最轻的元素。它的单原子形试式(H）是宇宙中最丰富的化学物质，大约占所有重子质量的75%.', 'Henry Cavendish(亨利·卡文迪什)', '-252.87 ℃', '0.0000899 (g/cm)', '1', '周期:1 族:IA 区:S ', '气态', 'H⁺,H⁻');
INSERT INTO `atom` VALUES (4, 'He', '氦', 4.0026, 2, '氦简写为He，其原子序为2，原子量为4.002602。是一种无色，无臭，无味，的惰性单原子气休。同时，在元素周期表上，它也是稀有气体的第一个元素。沸点为所有元素中最低的。', 'Pierre Jules Cesar Janssen(皮埃尔·朱尔·塞萨尔让森)Joseph Norman Lockyer (约瑟夫·诺曼·洛克耶)', '-272.2 ℃', '0.00017846 (g/cm)', '0', '周期:1族:VIIA区:S', '气态', '无');
INSERT INTO `atom` VALUES (5, 'Li', '锂', 6.941, 3, '锂是一种化学元素，其符号为Li,原子序数为3.它是一种软的银白色金属 ，属于碱金属元素。在标准条件下，', 'Johan August Arfwedson (约翰:奥古斯特阿弗埃德森)', '180.5 °C', '0.534 (g/cm)', '1', '周期：2 族：IA 区：S', '固态', 'Li⁺');
INSERT INTO `atom` VALUES (6, 'Be', '铍', 9.01218, 4, '铍是种化学元素，符号为Be，原子序为4，属于碱十金属。铍通常在宇宙射线散裂过程中产生,是宇宙中较', 'Louis-Nicolas Vauquelin (路易斯尼古拉斯沃克兰)', '1278 ℃', '1.848 (g/cm)', '2', '周期：2 族：IIA 区：S', '固态', 'Be²⁺');
INSERT INTO `atom` VALUES (7, 'B', '硼', 10.811, 5, '硼是一种化学元素，化学符号为B，原子序为5.由于硼的产生完全来自于宇宙射线散裂以及超新星而非恒星核合成，所以硼在太阳系与地壳[9]中含量很低。地球上最常见硼的天然化合物，是以水溶性的硼酸盐形式聚集在起。 工业上可直接开采硼盐酸的蒸发岩,例如硼砂和斜方硼砂.', 'Joseph Louis Gay-Lussac (约瑟夫:路易盖吕萨克) Louis Jacques Thenard (路易:雅克泰纳)', '2075.8℃', '2.34 (g/cm)', '3', '周期：2 族：IIIA 区：P', '固态', '无');
INSERT INTO `atom` VALUES (8, 'C', '碳', 12.0107, 6, '碳是一种化学元素,符号为C,原子序数为6，位于元素周期表中的IV A族,属于非金属。每个碳原子有四颗能够进行键合的电子，因此其化合价通常为4。 自然产生的碳由三种同位素组成:碳1 2和碳-13为稳定同位素，而碳14则具放射性，半衰期约为5,730年。碳是少数几个自远古就被发现的元素之一', 'Antoine Laurent de Lavoisier', '4827 °C', '2.26 (g/cm)', '2，4', '周期：2 族：IVA 区：P', '固态', '无');
INSERT INTO `atom` VALUES (9, 'N', '氮', 14.0067, 7, '原子序教为7它是最轻的氮族元素 在室温下，它是种透明无味的双原子气', 'Daniel Rutherford (丹尼尔卢瑟福)', '-195.8 °C', '0.001251 (g/cm)', '3,4,5', '周期：2 族：VA 区：P', '气态', 'N³⁻');
INSERT INTO `atom` VALUES (10, 'O', '氧', 15.9994, 8, '氧是种化学元素，符号为O，原子序为8 ,在元素周期表中属于氧族。氧属于非金属，是具有高反应性的氧化的主要成分之，在体积上占20.8%。 地球地壳中近半的质量都是由氧和氧化物所组成', 'Michat Sedziwoj (迈克尔森迪吉奥)Joseph Priestley (约瑟夫普里斯特利)Carl Wilhelm Scheele (卡尔威尔海姆:舍勒)', '- 182.96 °C ', '0.00142897 (g/cm)', '2', '周期：2 族：VI 区：P', '气态', 'O²⁻');
INSERT INTO `atom` VALUES (11, 'F', '氟', 18.9984, 9, '氟是一种化学元素，符号为F，其原子序数为9，是最轻的卤素。其单质在标准状况下为浅黄色的双原子气体，剧毒为电负性最强的元素', 'Ferdinand Frederic Henri Moissan (费迪南德弗雷德里克亨利:莫伊桑)', '-219.67 °C', '0.001696 (g/cm)', '1', '周期：2 族：VIIA 区：P', '气态', 'F⁻');
INSERT INTO `atom` VALUES (12, 'Ne', '氖', 20.1797, 10, '氖是种化学元素，它的化学符号是Ne，它的原子序数是10.在标准状态下是一种无色无味的惰性单原子气体[7] ,其密度是空气的三分之二', 'Sir William Ramsay (威廉:拉姆齐爵士)Morris William Travers (莫里斯:威廉特拉弗斯)', '-248.67 °C', '0.0009002 (g/cm)', '0', '周期：2 族 ：VIIIA 区：P', '气态', '无');
INSERT INTO `atom` VALUES (13, 'Na', '钠', 22.9898, 11, '钠是种化学元素，元素符号为Na ,它原子序是11，相对原子量为23.它是柔软且活性大的银白色金属.钠周期表的第一族元素 ，又称碱金属。因为它价壳层只有单个电子，所以容易失去电子形成带正电的阳离子', 'Humphry Davy (汉弗里戴维)', '97.8 °C', '0.971 (g/cm)', '1', '周期：3 族：IA 区：S', '固态', 'Na⁺');
INSERT INTO `atom` VALUES (14, 'Mg', '镁', 24.305, 12, '原子序数为12的化学元素。是种闪亮的灰色固体', 'Joseph Black (约瑟夫布莱克)Humphry Davy (汉弗里:戴维)', '650 °C', '1.738 (g/cm)', '2', '周期：3 族：IIA 区：S', '固态', 'Mg²⁺');
INSERT INTO `atom` VALUES (15, 'Al', '铝', 26.9815, 13, '铝( Aluminum)是化学元素， 属于硼族元素， 化学符号是AI, 原子序数是13， 相对密度是2.70。 铝是较软的易延展的银白色全属也县地壳中第三大主度的元表 (仅次干氧和硅地县主度最 大的全属在地球的周体表面中占约8%的质量。铝金属在化学 上很活跃，因此除非在极其特殊的氧化还原环境下，一般很难找到游离态的金属铝。被发现的含铝的矿物超过270种。最主要的含铝矿石是铝土矿。', 'Hans Christian Orsted (汉斯克里斯蒂:安奥斯特)', '660 °C', '2.6989 (g/cm)', '1，3', '周期：3 族：IIIA 区：P', '固态', 'AL³⁺');
INSERT INTO `atom` VALUES (16, 'Si', '硅', 28.0855, 14, '硅(英语: Silicon ,元素符号: Si ,原子序为14) , 又译矽，是一种化学元素。为带灰蓝色金属光泽且坚硬易碎的晶体,亦是种四价的类金属半导体。 硅为周期表第+四族元素之:碳在其排序之 上,其下依序为锗锡铅注1].由于它对于氧的高亲和力，直至在公元1823年才第次被永斯贝采利乌斯成功纯化。', 'Jons Jakob Berzelius (琼斯雅可比贝采里乌斯)', '1414.85 °C', '2.33 (g/cm)', '2，4', '周期：3 族：IVA 区：P', '固态', '无');
INSERT INTO `atom` VALUES (17, 'P', '磷', 30.9738, 15, '原子序数为15.作为种元素，磷以两种主要形式存在-白磷和红磷-但由于其高反应性,磷在地球上从未被发现为自由元素。相反，含磷矿物质几乎总是以其最大氧化状态存在,如无机磷酸盐岩石', 'Hennig Brand (何尼格布兰德', '280.5 °C', '2.82 (g/cm)', '3，5', '周期：3 族：VA 区：P', '固态', 'P³⁻');
INSERT INTO `atom` VALUES (18, 'S', '硫', 32.065, 16, '硫是一 种化学元素，在元素周期表中它的化学符号是S，原子序数是16.硫是一种非常常见的无味无臭的非金属，纯的硫是黄色的晶体，又称硫黄，硫苏磅有许多不同的化合价，常见的有2,0, +4, +6等', '无记载', '444.67 °C', '2.07 (g/cm)', '2，4，6', '周期：3 族：VIA 区：P', '固态', 'S²⁻');
INSERT INTO `atom` VALUES (19, 'Cl', '氯', 35.453, 17, '氯(Chlorine)是一 种卤族化学元素， 化学符号为CI, 原子序数为17. 第二轻的卤素，在周期表里出现在氟和溴间它的性质息在他们中间体间 气在空泪呈现息黄绿色气体', 'Carl Wilhelm Scheele(卡尔 威尔海姆 舍勒)', '-100.98 °C ', '0.003214 (g/cm)', '1，3，5，7', '周期：3 族：VIIA 区：P', '气态', 'CL⁻');
INSERT INTO `atom` VALUES (20, 'Ar', '氩', 39.948, 18, '氩( Argon )元素的化学符号是Ar，原子序是18，位在周期表的第18族，是一种惰性气体。怎占大气体积的0.934% ( 9340 ppmv) , 是地球大气层第三多的气体,是水蒸气的两倍以上(平均4000 ppmv左右,但变化很大)、-氧化碳(400 ppmv)的23倍之多、氖( 18 ppmv )的500倍以上argon这个名称源自于希腊语中的apyov ,意思是“懒情的\"、“不活跃的\"', 'Sir Wiliam Ramsay (威廉:拉姆齐爵士) ', '-189.34 °C', '0.001784 (g/cm)', '0', '周期：3 族：VIIIA 区：P', '气态', '无');
INSERT INTO `atom` VALUES (21, 'K', '钾', 39.948, 19, '钾是原子序数为19的化学元素。钾最早于植物的灰烬中所分离出,故其名称源自植物的灰烬。在元素周期表中,钾属于碱金族,所有碱金族在外部电子壳中都具有单价电子在离子盐中发生。其易被去除电子而形成具有正电荷的离子阳离子 (阳离子可与阴离子结合形成盐)', 'Humphry Davy (汉弗里:戴维)', '63.38 °C ', '0.856 (g/cm)', '1', '周期：4 族：IA 区：S', '固态', 'K ⁺');
INSERT INTO `atom` VALUES (22, 'Ca', '钙', 40.078, 20, '原子序数为20.钙是一种软灰色碱土金属,是地壳中质量第五丰富的元素', 'Humphry Davy (汉弗里:戴维)', '842 °C ', '1.55 (g/cm) ', '', '周期：4 族：IIA 区：S', '固态', 'Ca²⁺');

SET FOREIGN_KEY_CHECKS = 1;
