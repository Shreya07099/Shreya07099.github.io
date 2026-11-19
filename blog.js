window.SITE = window.SITE || {};
window.SITE.blogPosts = [
  {
    id: "alignment-lifecycle",
    title: "Alignment methods across the model lifecycle",
    date: "November 2026",
    excerpt:
      "Alignment methods are applied at different stages of building an LLM. The stage matters for how well they work, and how easily they can be bypassed.",
    body: [
      { type: "h2", text: "Introduction" },
      {
        type: "p",
        text: "In the past few years, research in the field of AI safety has given us various methods to align a large language model (LLM) to certain values and ideas. This is mostly done to prevent the model from responding in a harmful manner or giving any kind of harmful output. Such alignment methods are implemented at different stages in a model lifecycle. Now, what do I mean by a model lifecycle?",
      },
      {
        type: "p",
        text: "I refer to the different stages in the process of building an LLM, broadly:",
      },
      {
        type: "h3",
        text: "1. Pre-training",
      },
      {
        type: "p",
        text: "The main objective of this stage, the first stage, is to give the model broad foundational knowledge before it is specialized for a specific domain. This is done by feeding massive amounts of unlabeled data into a neural network and training it to predict the next token (a small unit of text that can be a word, character, or a part of a word).",
      },
      {
        type: "p",
        text: "At this point in model training, the model gains a fundamental understanding of broad language structures, syntax, and world knowledge.",
      },
      {
        type: "h3",
        text: "2. Post-training",
      },
      {
        type: "p",
        text: "This stage, after pre-training, aims to transform the raw text-prediction base model into a model that specializes in a domain; it is also the stage where multiple alignment methods are applied to teach the model safe behavior. Methods like Supervised Fine-Tuning (SFT), Reinforcement Learning from Human Feedback (RLHF) and many more are used for this purpose.",
      },
      {
        type: "p",
        text: "At the end of this stage, we are supposed to have an instruct-tuned, aligned and specialized model ready for deployment.",
      },
      {
        type: "h3",
        text: "3. Deployment / inference",
      },
      {
        type: "p",
        text: "This stage is when the finished post-trained model is placed on live servers to answer real-time user queries. It is not training the model, but rather the application of the trained model. This stage focuses on speed and reliability of the model, and the model is put in situations it might not have seen in its testing phase.",
      },
      {
        type: "p",
        text: "Alignment methods such as data filtering, RLHF, model unlearning and system prompting, not only differ in how they are implemented but also in the stage (pre-training, post-training or inference) they are implemented in. This article elaborates on the effectiveness and limitations of such methods while arguing that the difference in the model stage has an influence on the effectiveness of the alignment method, and especially how easily it can be bypassed or undone, and shows why no single alignment method is enough to align a model to a set of values.",
      },
      {
        type: "p",
        text: "This article progresses in the following way: a few well-documented alignment methods are picked from each stage in a model's lifecycle and each one is detailed in the following manner:",
      },
      {
        type: "ol",
        items: [
          "What the method is, a short description of how it works",
          "Effectiveness and its limitations and analysis of how easily it can be bypassed, with a placement on a four-point scale.",
        ],
      },
      {
        type: "levels",
        items: [
          {
            label: "Level 1",
            text: "The alignment method can be bypassed by a direct harmful request or a prompt with no adversarial intent, under ordinary use. The access level needed in this scenario would be low, as one would only need to prompt the model to produce a harmful output.",
          },
          {
            label: "Level 2",
            text: "The alignment method can be bypassed by prompt rephrasing, reformatting or few-shot examples. The access level needed in this scenario would again be low as at the previous level.",
          },
          {
            label: "Level 3",
            text: "The alignment method can be bypassed by light fine-tuning on roughly 10 to 100 examples. This would require access to the model's internal weights, so the access level here would be higher comparatively.",
          },
          {
            label: "Level 4",
            text: "The alignment method can be bypassed by extensive retraining. This would again require access to the model's internal weights.",
          },
        ],
      },
      {
        type: "p",
        text: "These levels are meant for a rough comparison, not precise measurements.",
      },
      { type: "h2", text: "Pre-training" },
      { type: "h3", text: "Data filtering" },
      { type: "h4", text: "What is it?" },
      {
        type: "p",
        text: "Data filtering is the process of removing unwanted or harmful data from the dataset on which a model's pre-training is performed. Content in the dataset can be flagged as harmful by using various methods such as keyword filtering, classifiers, or both together. Once it has been decided that the content is harmful, it can be filtered out, so that the model never learns from it. This is done with the understanding that if the model never learns from harmful data, it would not produce harmful outputs.",
      },
      { type: "h4", text: "Effectiveness" },
      {
        type: "p",
        text: "Taking two studies on data filtering, one by Anthropic [2] and the other titled the Deep Ignorance Study [1], we see that data filtering in the pre-training stage has significant results. The Anthropic paper reported a 33% reduction in the model's accuracy on a harmful-capabilities evaluation, relative to a random baseline, in the cases where Chemical, Biological, Radiological and Nuclear (CBRN) scenarios were concerned, while showing that most of the general capabilities of the model were preserved. The Deep Ignorance paper showed similar results as well: while preserving model capabilities, it caused a significant reduction in the harmful responses in the model. Testing the durability of the harmlessness produced by the model, the authors found that filtered models maintained their harmlessness even after aggressive fine-tuning on bioscientific threats. Furthermore, fine-tuning on normal, unfiltered datasets without any specific adversarial intent also did not restore the model's previously harmful capabilities.",
      },
      { type: "h4", text: "Limitations" },
      {
        type: "p",
        text: "The authors of the Deep Ignorance study noted accuracy on harmful questions increased or remained intact in some specific cases:",
      },
      {
        type: "ol",
        items: [
          "When it was provided with context of harmful information from an external source in the prompt (in-context retrieval), it was able to use its reasoning capabilities to give harmful outputs, achieving accuracy rates of up to 82%.",
          "When it was trained on synthetic documents that gave it incorrect scientific information, instead of decreasing the accuracy on harmful questions, the accuracy on harmful questions increased.",
        ],
      },
      {
        type: "p",
        text: "These are the two main limitations the authors expressed in their work. Other than that, the authors pointed out that filtering out data only erased the model's factual knowledge of harmful activities and not its behavioral propensities such as jailbreaking. Furthermore, both of these studies were done on medium sized models, and there is debate on whether the technique would work on larger models.",
      },
      {
        type: "p",
        text: "We notice here that in the Deep Ignorance paper, the harmful factual knowledge that was removed could not be retrieved easily, and the model would have to be heavily retrained to do so (Level 4). However, its general capabilities were able to reason and produce harmful outputs when harmful information from an external source was given to it (Level 2). This method did not have any impact on the behavioral propensities of the model, like the choices a model makes (for example, jailbreaking). This shows us that while pre-training data filtering successfully achieves the aim of eliminating harmful factual knowledge from the model, it does not necessarily label harmful information or refuse it; it just knows less about it. So, when an external prompt with harmful information is given to the model, it does not refuse it and responds, suggesting that this method cannot be used as a standalone method of alignment.",
      },
      { type: "h2", text: "Post-training" },
      { type: "h3", text: "Supervised Fine-Tuning" },
      { type: "h4", text: "What is it?" },
      {
        type: "p",
        text: "SFT is usually regarded as the first step in model training towards alignment. It is a process in which the model is trained on a curated dataset of prompt-response pairs. The dataset is curated with the help of human labelers to represent the desired behavior in the model. It gives the model a baseline of behavior to operate from.",
      },
      { type: "h4", text: "Effectiveness and limitations" },
      {
        type: "p",
        text: "SFT operates strictly on individual prompt-response pairs, and the model that comes out of SFT only imitates what it has learnt from those pairs without any constraints. That is to say, if there was noise or bias in the curated dataset, SFT would learn to imitate that as well, often leading to lower harmlessness compared to other post-training methods such as RLHF or DPO (Direct Preference Optimization). [3]",
      },
      {
        type: "p",
        text: "Due to the absence of constraints on what the model imitates and its learned behavior of being helpful, SFT alone as just an alignment method has exhibited low harmlessness scores, directly answering harmful prompts without any modification (Level 1). Hence, it is usually paired with other alignment methods like RLHF or DPO.",
      },
      {
        type: "h3",
        text: "Reinforcement Learning from Human Feedback",
      },
      { type: "h4", text: "What is it?" },
      {
        type: "p",
        text: "RLHF is a post-training alignment method that uses a reward model, trained on human preference feedback, to score a response generated by the model. The reward model then either rewards or penalizes the response, which optimizes the model via reinforcement learning so that safety guardrails are embedded into the model.",
      },
      { type: "h4", text: "Effectiveness and limitations" },
      {
        type: "p",
        text: "Initial RLHF alignment has been highly effective at restricting harmful behavior in most cases. However, custom fine-tuning with harmful responses was seen to override this safety alignment and raise harmfulness by light fine-tuning on 10 to 100 explicitly harmful examples (Level 3). [4]",
      },
      {
        type: "p",
        text: "Moreover, a different problem comes to light when RLHF is used, because of the very nature of this method depending on rewards: the model tends to learn reward hacking. Reward hacking is a well-documented limitation of RLHF. It happens when a model finds a loophole to maximize its score on a reward function without actually solving the intended problem. This gives rise to many safety problems in LLMs, where a model pursues a different goal from the one intended by its user.",
      },
      {
        type: "h3",
        text: "Model unlearning: Representation Misdirection for Unlearning (RMU)",
      },
      { type: "h4", text: "What is it?" },
      {
        type: "p",
        text: "RMU is a model unlearning method that can be performed on a deployment-ready model after all its post-training is done. The objective of this method is to help the model unlearn harmful knowledge it has by steering the model's intermediate internal representations on target forget data (harmful knowledge) towards a random state. This forces low confidence, usually nonsensical, outputs on prompts regarding harmful knowledge, while retaining useful knowledge.",
      },
      { type: "h4", text: "Effectiveness and limitations" },
      {
        type: "p",
        text: "RMU achieves strong unlearning results when applied to an early layer of a transformer, rather than the middle and late layers. However, this method of safety alignment failed when it was exposed to 5-shot prompting and prompt rephrasing. When prompts were formatted as poems, conversation or translated into different languages, the model's accuracy on harmful questions increased significantly (Level 2). [5]",
      },
      { type: "h2", text: "Inference / deployment" },
      { type: "h3", text: "System prompting" },
      { type: "h4", text: "What is it?" },
      {
        type: "p",
        text: "System prompts are a set of top-level instructions provided by developers to govern an LLM's overall behavior. They are generally given with regard to safety and alignment behavior, to provide guidelines for general model behavior. However, they have no architectural enforcement mechanism on LLMs and hence are generally treated as advisory to the LLMs.",
      },
      { type: "h4", text: "Effectiveness and limitations" },
      {
        type: "p",
        text: "System prompts have no direct effect on the internal weights of the model in any significant manner. Hence the effectiveness of this method in terms of alignment is limited. Large scale empirical studies show that over 80% of commercial LLM-based applications leak their hidden system prompts when prompted with adversarial queries (Level 1), with over 52% of them failing despite having explicit defensive instructions in their system prompts. Furthermore, it has been found that system prompts can be exploited by multi-turn probing, where attackers collect hidden prompt details over multiple turns by asking simple, harmless-looking questions that slip past the single-query guardrails set by a system prompt (Level 2). [6] [7]",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "A method applied in pre-training becomes part of what the model learns, while a method applied later works on what the model already knows. In the methods examined here, the knowledge removed by data filtering was the hardest to retrieve, as it required heavy retraining of the model (Level 4). That is not to say that harmful outputs could not be produced by other means (in-context retrieval, Level 2, in this case). Methods implemented in later stages were bypassed by easier means, such as fine-tuning with a few examples or prompting differently.",
      },
      {
        type: "p",
        text: "This suggests two things. One, stages may influence how easily an alignment method may fail when attacked. Two, none of the methods examined here can be used alone to ensure complete model safety. That is to say, while one method might be stronger (harder to bypass) in alignment than the other, it might not address all concerns, which suggests that a combination of all such methods would give us a safer model.",
      },
    ],
  },
];
